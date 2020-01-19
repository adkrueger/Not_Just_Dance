<<<<<<< HEAD
let newJson;
let newTimes;

fetch("wholeDance.json")
    .then(response => response.json())
    .then((json) => {
        let times = new Array(json.length);
        newJson = json;
        newJson.forEach((arr, i) => {
            times[i] = arr[0];
        });
        newTimes = times;
    });

function binarySearch(arr, target, start, end) {
    let midpoint = Math.floor((start + end) / 2);

    if (arr[midpoint] === target) {
        return midpoint;
    }
    if (end < start) {
        return midpoint;
    }

    if (arr[midpoint] > target) {
        return binarySearch(arr, target, start, midpoint - 1);
    } else if (arr[midpoint] < target) {
        return binarySearch(arr, target, midpoint + 1, end);
    }
}

function get_closest_pose(n) {
  let index = binarySearch(newTimes, n, 0, newTimes.length);
  return newJson[index];
}
=======
let newJson;
let newTimes;

fetch("danceMoves.json")
    .then(response => response.json())
    .then((json) => {
        let times = new Array(json.length);
        newJson = json;
        newJson.forEach((arr, i) => {
            times[i] = arr[0];
        });
        newTimes = times;
    });

function binarySearch(arr, target, start, end) {
    let midpoint = Math.floor((start + end) / 2);

    if (arr[midpoint] === target) {
        return midpoint;
    }
    if (end < start) {
        return midpoint;
    }

    if (arr[midpoint] > target) {
        return binarySearch(arr, target, start, midpoint - 1);
    } else if (arr[midpoint] < target) {
        return binarySearch(arr, target, midpoint + 1, end);
    }
}

function get_closest_pose(n) {
  console.log(n);
  let index = binarySearch(newTimes, n, 0, newTimes.length);
  console.log(index);
  return newJson[index];
}
>>>>>>> captureVideoPose
