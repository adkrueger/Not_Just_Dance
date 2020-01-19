let danceBoi;

let playingFile = true;
let total = 0;

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8,"
    + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

window.onload = function() {
  const videoWidth = 600;
  const videoHeight = 500;

  let startTime = 0;

  let d = new Date();

  async function setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
          'Browser API navigator.mediaDevices.getUserMedia not available');
    }

    const video = document.getElementById('video');
    video.width = videoWidth;
    video.height = videoHeight;

    const mobile = false;
    const stream = await navigator.mediaDevices.getUserMedia({
      'audio': false,
      'video': {
        facingMode: 'user',
        width: mobile ? undefined : videoWidth,
        height: mobile ? undefined : videoHeight,
      },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }


  async function loadVideo() {
    const video = await setupCamera();
    video.play();

    return video;
  }

  function detectPoseInRealTime(video, net) {

    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');

    const flipPoseHorizontal = true;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    async function framePose() {
      if(playingFile) {
        const d = new Date();
        const currTime = d.getTime();
        if(startTime == 0) {
          startTime = currTime;
        }

        const canvas2 = document.getElementById('output2');
        const ctx2 = canvas2.getContext('2d');

        canvas2.width = videoWidth;
        canvas2.height = videoHeight;

        let inDance = get_closest_pose(currTime - startTime);
        if(inDance && danceBoi) {
          let dance = get_closest_pose(currTime - startTime)[1];
          let you = angle_thing_that_works_sometimes(dance);
          let me = angle_thing_that_works_sometimes(danceBoi);

          total = 0;
          you.forEach((l, i) => {
            total += Math.abs(l - me[i]);
          });
          total = 100 - Math.round((total / 3.0) * 100);
          drawSkeleton(dance.keypoints, ctx2);
          drawKeypoints(dance.keypoints, ctx2);
          let text = document.getElementById("timer");
          setTimeout(() => text.innerHTML = " 3 ", 0);
          setTimeout(() => text.innerHTML = " 2 ", 666);
          setTimeout(() => text.innerHTML = " 1 ", 1333);
          setTimeout(() => text.innerHTML = " POSE ", 2000);
          setTimeout(() => {
            if(total) {
              let tmT = document.getElementById("score");
              if(total > 30) {
                tmT.innerHTML = "GOOD";
              } else {
                tmT.innerHTML = "BAD";
              }
            }
            else {
              let tmT = document.getElementById("score");
              tmT.innerHTML = "BAD";
            }
          }, 2500)
        } else {
          let text = document.getElementById("timer");
          text.innerHTML = "START";
          startTime = currTime;
        }
        setTimeout(() => {
          framePose();
        }, 3500);
      }
    }

    async function poseDetectionFrame() {
      let all_poses = await net.estimatePoses(video, {
        flipHorizontal: flipPoseHorizontal,
        decodingMethod: 'multi-person'
      });

      ctx.clearRect(0, 0, videoWidth, videoHeight);

      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      //ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();

      if(all_poses.length > 0) {
        danceBoi = all_poses[0];
        drawSkeleton(all_poses[0].keypoints, ctx);
        drawKeypoints(all_poses[0].keypoints, ctx);
      }

      /*
      all_poses.forEach(({score, keypoints}) => {
        drawSkeleton(keypoints, ctx);
        drawKeypoints(keypoints, ctx);
      });
      */

      requestAnimationFrame(poseDetectionFrame);
      //setTimeout(poseDetectionFrame, 1000);
    }

    poseDetectionFrame();
    framePose();
  }

  async function bindPage() {

    const net = await posenet.load({
      architecture: 'ResNet50',
      outputStride: 32,
      inputResolution: {width: 257, height: 200},
      quantBytes: 2
    });

    /*
    const net = await posenet.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: { width: 640, height: 480 },
      multiplier: 0.75
    });
    */

    let video;

    try {
      video = await loadVideo();
    } catch (e) {
      console.log("Video capture failed");
      throw e;
    }

    detectPoseInRealTime(video, net);
  }

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  bindPage();
}
