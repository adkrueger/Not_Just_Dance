//get closest taken pose in array, return everything after the number
//json.parse

/*

*/


/*

var counts = json,
  goal = n;

var closest = counts.reduce(function(prev, curr) {
  return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
});

console.log(closest);
*/


function binarySearch(arr, target, start, end){
  let midpoint = Math.floor((start + end) / 2);

  if (arr[midpoint] == target){
    return midpoint;
  }
  if (start > end){
    return midpoint;
  }

  if (arr[midpoint] > target){
    return binarySearch(arr, target, start, midpoint - 1);
  } else if (arr[midpoint] < target){
    return binarySearch(arr, target, midpoint + 1, end);
  }
}

  function get_closest_pose(n) {
    fetch("wholeDance.json")
    .then(response => response.json())
    .then((json) => {
      console.log(json);
      let times = new Array(json.length);
      json.forEach((arr, i) => {
        times[i] = arr[0];
      });
      let closestIndex = binarySearch(times, n, 0, times.length);
      console.log(json[closestIndex]);
    });

    /*
    
    n = closest(json[n]);
    
    const obj = JSON.parse(pose);
    console.log(obj);
    */
  }

  get_closest_pose(6969);
