let capture;
let video;
let poseNet;

let zero = {
  x: 0,
  y: 0
};

let pose;
let skeleton;

function setup() {
  createCanvas(640 * 2, 480 * 2);
  capture = createVideo("video.mp4");
  capture2 = createCapture(VIDEO);
  capture2.hide();
  capture.loop();
  capture.hide();
  capture.size(width, height);
  capture2.size(width, height);
  capture.elt.muted = true;
  poseNet = ml5.poseNet(capture, modelLoaded);
  poseNet.on("pose", sendPoses);
}

function draw() {
  stroke(255);
  strokeWeight(8);
  image(capture, 0, 0, width, height);
  image(capture2, 0, height, width, height);
  if (pose) {
    pose.forEach((pos, i) => {
      ellipse(pos.x, pos.y, 10, 10);
    });
  }
  if (skeleton) {
    skeleton.forEach((ske, i) => {
      line(ske[0].x, ske[0].y, ske[1].x, ske[1].y);
    });
  }
}


function modelLoaded() {
  console.log("Posenet Online");
}

function sendPoses(poses) {
  if(poses.length > 0) {
    updatePose(poses[0].pose, poses[0].skeleton);
  }
}

function updatePose(inPose, inSkeleton) {
  let keypoints = inPose.keypoints;
  if (keypoints.length > 0) {
    if (!pose) {
      pose = new Array(keypoints.length).fill(
        zero);
    }
    if (!skeleton ||
      skeleton.length != inSkeleton.length) {
      skeleton = new Array(inSkeleton.length).fill(
        [zero, zero]);
    }
    pose.forEach((pos, i) => {
      let newPos = keypoints[i].position;
      pose[i] = {
        x: lerp(newPos.x, pos.x, 0.1),
        y: lerp(newPos.y, pos.y, 0.1)
      };
    });
    skeleton.forEach((ske, i) => {
      let first = inSkeleton[i][0].position;
      let second = inSkeleton[i][1].position;
      skeleton[i] = [first, second];
    });
  }
}
