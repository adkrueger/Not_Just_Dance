//get closest taken pose in array, return everything after the number
//json.parse





var counts = json,
  goal = n;

var closest = counts.reduce(function(prev, curr) {
  return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
});

console.log(closest);




  function get_closest_pose(n, pose) {
    fetch("wholeDance.json")
    .then(response => response.json())
    .then(json => console.log(json));
    
    closest(json[n]);
    
    const obj = JSON.parse(pose);
    console.log(obj);
  }