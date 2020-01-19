let danceBoi;

let playingFile = false;

let total = 0;

let pose;

let multi = false;

function toggleMulti() {
  multi = !multi;
}

window.onload = function() {
  const videoWidth = 600;
  const videoHeight = 500;

  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');

  canvas.width = videoWidth;
  canvas.height = videoHeight;

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

    const flipPoseHorizontal = true;

    /*
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
            let a = (l - me[i]) * (180/Math.PI);
            a = (a + 180) % 360 - 180;
            if(a) {
              total += a;
            }
          });
          total = Math.round((1440 - total) / 14);
          let tmT = document.getElementById("score");
          tmT.innerHTML = total;
          drawSkeleton(dance.keypoints, ctx2);
          drawKeypoints(dance.keypoints, ctx2);
          /*
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
        else {
          startTime = currTime;
        }
        //requestAnimationFrame(framePose);
      }
    }
    */

    async function poseDetectionFrame() {
      pose = await net.estimatePoses(video, {
        flipHorizontal: flipPoseHorizontal,
        decodingMethod: 'multi-person'
      });

      /*
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      //ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();
      */

      /*
      if(pose.length > 0) {
        danceBoi = pose[0];
        drawSkeleton(pose[0].keypoints, ctx);
        drawKeypoints(pose[0].keypoints, ctx);
      }
      */

      /*
      all_poses.forEach(({score, keypoints}) => {
        drawSkeleton(keypoints, ctx);
        drawKeypoints(keypoints, ctx);
      });
      */

      //requestAnimationFrame(poseDetectionFrame);
      requestAnimationFrame(poseDetectionFrame());
    }

    function drawMe() {
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      if(pose && pose.length > 0) {
        //danceBoi = pose[0];
        //drawSkeleton(pose[0].keypoints, ctx);
        if(multi) {
          pose.forEach((l, i) => {
            drawKeypoints(l.keypoints, ctx, i, multi);
          });
        } else {
          drawKeypoints(pose[0].keypoints, ctx, 1, multi);
        }
      }
      requestAnimationFrame(drawMe);
    }

    poseDetectionFrame();
    //framePose();
    drawMe();
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
