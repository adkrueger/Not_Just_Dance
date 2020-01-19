const lineScale = 0.3;
const lineColor = 'white';

const headScale = 1.5;

const shoulderScale = 0.3;
const shoulderColor = 'gray';

const elbowScale = 0.25;

const wristScale = 0.2;

let poseDraw = new Array(10).fill(0);

let emote = new Image();
emote.src = "head.png";

function toTuple({y, x}) {
  return [y, x];
}

function drawSegment([ay, ax], [by, bx], color, scale, ctx, d) {
  d *= lineScale;
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = d;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawKeypoints(keypoints, ctx, r, multi, scale = 1) {
  console.log(poseDraw[r]);
  if(poseDraw[r] === 0) {
    poseDraw[r] = keypoints;
  }

  if(multi) {
    poseDraw[r] = keypoints;
  } else {
    poseDraw[r].forEach((l,i) => {
      poseDraw[r][i].position = lerpPos(poseDraw[r][i].position, keypoints[i].position);
    });
  }

  const leftEar = poseDraw[r][3].position;
  const rightEar = poseDraw[r][4].position;

  const earDistance = Math.sqrt(Math.pow(leftEar.x - rightEar.x, 2) + Math.pow(leftEar.y - rightEar.y, 2));

  const centerX = (leftEar.x + rightEar.x) / 2;
  const centerY = (leftEar.y + rightEar.y) / 2;

  const leftShoulder = poseDraw[r][5].position;
  const rightShoulder = poseDraw[r][6].position;

  const angle = Math.atan2(rightEar.y - leftEar.y, rightEar.x - leftEar.x) * 180 / Math.PI;

  const d = earDistance;

  const leftElbow = poseDraw[r][7].position;
  const rightElbow = poseDraw[r][8].position;
  const leftWrist = poseDraw[r][9].position;
  const rightWrist = poseDraw[r][10].position;

  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(poseDraw[r]);
  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
        toTuple(keypoints[0].position), toTuple(keypoints[1].position), lineColor,
        scale, ctx, earDistance);
  });

  drawPoint(ctx, leftShoulder.y * scale, leftShoulder.x * scale, d * shoulderScale, shoulderColor);
  drawPoint(ctx, rightShoulder.y * scale, rightShoulder.x * scale, d * shoulderScale, shoulderColor);
  drawPoint(ctx, leftElbow.y * scale, leftElbow.x * scale, d * elbowScale, shoulderColor);
  drawPoint(ctx, rightElbow.y * scale, rightElbow.x * scale, d * elbowScale, shoulderColor);
  drawPoint(ctx, leftWrist.y * scale, leftWrist.x * scale, d * wristScale, shoulderColor);
  drawPoint(ctx, rightWrist.y * scale, rightWrist.x * scale, d * wristScale, shoulderColor);

  let hs = d * headScale;
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(Math.PI / 180 * (angle));
  ctx.drawImage(emote, -hs/2, -hs/2, hs, hs);
  ctx.restore();

  /*
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    const {y, x} = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, lineWidth, colorPoints);
  }
  */
}

function drawSkeleton(keypoints, ctx, scale = 1) {
  /*
  const leftEar = keypoints[3].position;
  const rightEar = keypoints[4].position;
  const earDistance = Math.sqrt(Math.pow(leftEar.x - rightEar.x, 2) + Math.pow(leftEar.y - rightEar.y, 2));

  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints);
  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
        toTuple(keypoints[0].position), toTuple(keypoints[1].position), lineColor,
        scale, ctx, earDistance);
  });
  */
}

function lerpPos (start, end) {
  return {
    x: lerp(start.x, end.x, 0.1),
    y: lerp(start.y, end.y, 0.1)
  }
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}
