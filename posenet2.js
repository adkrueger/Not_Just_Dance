<<<<<<< HEAD
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
    if(startTime == 0) {
      startTime = d.getTime();
    }
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');

    const flipPoseHorizontal = true;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

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
      /*

      if(all_poses.length > 0) {
        drawSkeleton(all_poses[0].keypoints, ctx);
        drawKeypoints(all_poses[0].keypoints, ctx);
      }
      */


      all_poses.forEach(({score, keypoints}) => {
        drawSkeleton(keypoints, ctx);
        drawKeypoints(keypoints, ctx);
      });

      /*

      const canvas2 = document.getElementById('output2');
      const ctx2 = canvas2.getContext('2d');

      canvas2.width = videoWidth * 2;
      canvas2.height = videoHeight * 2;

      d = new Date();
      let closestTime = d.getTime() - startTime;
      dance = get_closest_pose(closestTime)[1];
      drawSkeleton(dance.keypoints, ctx2);
      drawKeypoints(dance.keypoints, ctx2);

      */

      requestAnimationFrame(poseDetectionFrame);
    }

    poseDetectionFrame();
  }

  async function bindPage() {
    const net = await posenet.load({
      architecture: 'ResNet50',
      outputStride: 32,
      inputResolution: {width: 257, height: 200},
      quantBytes: 2
    });

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
=======
let capturing = false;
let poseFile = new Array();

let playingFile = true;

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

function toggleCapturing() {
  if(!capturing) {
    console.log("Starting in 3 seconds");
  }
  if(capturing) {
    console.log("Stopping in 3 seconds");
  }
  setTimeout(() => {
    if(!capturing) {
      console.log("Capturing started");
    }
    if(capturing) {
      console.log("Capturing stopped");
      downloadObjectAsJson(poseFile, "danceMoves");
    }
    capturing = !capturing;
  }, 3000);
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
        if(inDance) {
          let dance = get_closest_pose(currTime - startTime)[1];
          drawSkeleton(dance.keypoints, ctx2);
          drawKeypoints(dance.keypoints, ctx2);
        } else {
          startTime = currTime;
        }

        let text = document.getElementById("timer");
        setTimeout(framePose, 2750);
        setTimeout(() => text.innerHTML = " 3 ", 0);
        setTimeout(() => text.innerHTML = " 2 ", 666);
        setTimeout(() => text.innerHTML = " 1 ", 1333);
        setTimeout(() => text.innerHTML = " POSE ", 2000);
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
        if(capturing) {
          const d = new Date();
          const currTime = d.getTime();
          if(startTime == 0) {
            startTime = currTime;
          }
          poseFile.push([currTime - startTime,all_poses[0]]);
        }
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
>>>>>>> captureVideoPose
