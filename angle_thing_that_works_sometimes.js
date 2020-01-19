function angle_thing_that_works_sometimes(jsonFile) {
    console.log('HELLO HELLO\n');
    fetch("singlePose.json")
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            console.log(json[1]);
            let keypoints = json[1].keypoints;
            console.log(keypoints);

            let Mx = ((keypoints[1].position.x+keypoints[2].position.x+keypoints[3].position.x+
                keypoints[4].position.x+keypoints[5].position.x+keypoints[6].position.x+
                keypoints[7].position.x+keypoints[8].position.x+keypoints[9].position.x+
                keypoints[10].position.x+keypoints[11].position.x+keypoints[12].position.x+
                keypoints[13].position.x+keypoints[14].position.x+keypoints[15].position.x+
                keypoints[16].position.x)/16);
            console.log(Mx);

            let My = ((keypoints[1].position.y+keypoints[2].position.y+keypoints[3].position.y+
                keypoints[4].position.y+keypoints[5].position.y+keypoints[6].position.y+
                keypoints[7].position.y+keypoints[8].position.y+keypoints[9].position.y+
                keypoints[10].position.y+keypoints[11].position.y+keypoints[12].position.y+
                keypoints[13].position.y+keypoints[14].position.y+keypoints[15].position.y+
                keypoints[16].position.y)/16);
            console.log(My);

            let finalArr = [];
            finalArr.push(big_calculate(Mx, My, 5, 7, keypoints));
            finalArr.push(big_calculate(Mx, My, 6, 8, keypoints));
            finalArr.push(big_calculate(Mx, My, 7, 9, keypoints));
            finalArr.push(big_calculate(Mx, My, 8, 10, keypoints));
            finalArr.push(big_calculate(Mx, My, 11, 13, keypoints));
            finalArr.push(big_calculate(Mx, My, 12, 14, keypoints));
            finalArr.push(big_calculate(Mx, My, 13, 15, keypoints));
            finalArr.push(big_calculate(Mx, My, 14, 16, keypoints));
            console.log(finalArr);
            return finalArr;

        });
}

function big_calculate(Mx, My, pos1, pos2, keypoints) {
    let num = (2*Math.pow(My,2) + 2*Math.pow(Mx,2) - 2*(Mx)*(keypoints[pos1].position.x) - 2*(Mx)*(keypoints[pos2].position.x)
        - 4*(My)*(keypoints[pos1].position.y) + 2*(keypoints[pos1].position.x)*(keypoints[pos2].position.x)
        + 2*(keypoints[pos1].position.y)*(keypoints[pos2].position.y) + Math.pow((keypoints[pos1].position.y), 2)
        - Math.pow((keypoints[pos2].position.y), 2));
    let denom = Math.sqrt(Math.abs((Math.pow((keypoints[pos1].position.x), 2) + Math.pow((keypoints[pos1].position.y), 2) -
        2*(Mx)*(keypoints[pos1].position.x) - 2*(My)*(keypoints[pos1].position.y) + Math.pow(Mx,2) + Math.pow(My,2))*(Math.pow((keypoints[pos2].position.x), 2)
        + Math.pow((keypoints[pos1].position.y), 2) - 2*(Mx)*(keypoints[pos2].position.x) - 2*(My)*(keypoints[pos1].position.y)
        + Math.pow(Mx,2) + Math.pow(My,2))));
    let outcome = Math.acos(num/(2*denom));

    console.log(outcome);
    return outcome === undefined ? -1 : outcome;
}
