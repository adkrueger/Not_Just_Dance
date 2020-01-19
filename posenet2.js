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
