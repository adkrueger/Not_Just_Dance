let capture;
let video;
let poseNet;

let zero = {
  x: 0,
  y: 0
};

let pose;

let characterPoints = new Array(17).fill(zero);

let connected = [
  [8,10],
  [7,9],
  [5,7],
  [6,8],
  [5,11],
  [6,12],
  [5,6],
  [11,12],
  [11,13],
  [12,14],
  [13,15],
  [14,16]
];

let scaleSize = 2.5;

function setup() {
  createCanvas(320 * scaleSize, 240 * scaleSize);
  capture = createCapture(VIDEO, reCanvas);
  capture.size(width, height);
  capture.hide();
  poseNet = ml5.poseNet(capture, modelLoaded);
  poseNet.on("pose", sendPoses);;
}

function reCanvas() {

}


function draw() {
  stroke(255);
  strokeWeight(8);
  push();
  translate(capture.width, 0);
  //then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);
  //draw video capture feed as image inside p5 canvas
  image(capture, 0, 0, width, height);
  //background(255);
  if (pose) {
    characterPoints.forEach((char, i) => {
      let newPose = pose[i];
      characterPoints[i] = {
        x: lerp(char.x, newPose.x, 0.3),
        y: lerp(char.y, newPose.y, 0.3)
      }
    });
    let left = {
      x: characterPoints[3].x,
      y: characterPoints[3].y
    };
    let right = {
      x: characterPoints[4].x,
      y: characterPoints[4].y
    };
    let headPos = {
      x: (left.x + right.x) / 2,
      y: (left.y + right.y) / 2,
    }
    let dim = dist(left.x, left.y, right.x, right.y);
    circle(headPos.x, headPos.y, dim);
    fill(255, 0, 0);
    beginShape();
    vertex(characterPoints[5].x,  characterPoints[5].y);
    vertex(characterPoints[6].x,  characterPoints[6].y);
    vertex(characterPoints[12].x,  characterPoints[12].y);
    vertex(characterPoints[11].x,  characterPoints[11].y);
    endShape(CLOSE);
    characterPoints.forEach((char, i) => {
      let newPose = pose[i];
      ellipse(characterPoints[i].x, characterPoints[i].y, 10, 10);
    });
    connected.forEach((arr, i) => {
      line(characterPoints[arr[0]].x, characterPoints[arr[0]].y,
        characterPoints[arr[1]].x, characterPoints[arr[1]].y);
    });
  }
  pop();
  /*
  stroke(255,100,100);
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
  */
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
    pose.forEach((pos, i) => {
      pose[i] = keypoints[i].position;
    });
  }
}
