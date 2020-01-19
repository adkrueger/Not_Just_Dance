function angle_thing_that_works_sometimes(n) {

    fetch("singlePose.json")
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            let Mx = ((json[1].keypoints[1].position.x+json[1].keypoints[2].position.x+json[1].keypoints[3].
                position.x+
                json[1].keypoints[4].position.x+json[1].keypoints[5].position.x+json[1].keypoints[6].position.x+
                json[1].keypoints[7].position.x+json[1].keypoints[8].position.x+json[1].keypoints[9].position.x+
                json[1].keypoints[10].position.x+json[1].keypoints[11].position.x+json[1].keypoints[12].position.x+
                json[1].keypoints[13].position.x+json[1].keypoints[14].position.x+json[1].keypoints[15].position.x+
                json[1].keypoints[16].position.x)/16);
            console.log(Mx);

            let My = ((json[1].keypoints[1].position.y+json[1].keypoints[2].position.y+json[1].keypoints[3].
                position.y+
                json[1].keypoints[4].position.y+json[1].keypoints[5].position.y+json[1].keypoints[6].position.y+
                json[1].keypoints[7].position.y+json[1].keypoints[8].position.y+json[1].keypoints[9].position.y+
                json[1].keypoints[10].position.y+json[1].keypoints[11].position.y+json[1].keypoints[12].position.y+
                json[1].keypoints[13].position.y+json[1].keypoints[14].position.y+json[1].keypoints[15].position.y+
                json[1].keypoints[16].position.y)/16);
            console.log(My);


            let LSHLEL = Math.acos((2*(My)^2 + 2*(Mx)^2 - 2*(Mx)*(json[1].keypoints[5].position.x) - 2*(Mx)*(json[1].keypoints[7].position.x)
             - 4*(My)*(json[1].keypoints[5].position.y) + 2*(json[1].keypoints[5].position.x)*(xjson[1].keypoints[7].position.x)
            + 2*(json[1].keypoints[5].position.y)*(json[1].keypoints[7].position.y) + (json[1].keypoints[5].position.y)^2
            - (json[1].keypoints[7].position.y)^2)/2*(math.sqrt(((json[1].keypoints[5].position.x)^2 + (json[1].keypoints[5].position.y)^2 -
            2*(Mx)*(json[1].keypoints[5].position.x) - 2*(My)*(json[1].keypoints[5].position.y) + (Mx)^2 + (My)^2)((json[1].keypoints[7].position.x)^2
            + (json[1].keypoints[5].position.y)^2 - 2*(Mx)*(json[1].keypoints[7].position.x) - 2*(My)*(json[1].keypoints[5].position.y)
             + (Mx)^2 + (My)^2))))

             let RSHREL = Math.acos((2*(My)^2 + 2*(Mx)^2 - 2*(Mx)*(json[1].keypoints[6].position.x) - 2*(Mx)*(json[1].keypoints[8].position.x)
             - 4*(My)*(json[1].keypoints[6].position.y) + 2*(json[1].keypoints[6].position.x)*(xjson[1].keypoints[8].position.x)
            + 2*(json[1].keypoints[6].position.y)*(json[1].keypoints[8].position.y) + (json[1].keypoints[6].position.y)^2
            - (json[1].keypoints[8].position.y)^2)/2*(math.sqrt(((json[1].keypoints[6].position.x)^2 + (json[1].keypoints[6].position.y)^2 -
            2*(Mx)*(json[1].keypoints[6].position.x) - 2*(My)*(json[1].keypoints[6].position.y) + (Mx)^2 + (My)^2)((json[1].keypoints[8].position.x)^2
            + (json[1].keypoints[6].position.y)^2 - 2*(Mx)*(json[1].keypoints[8].position.x) - 2*(My)*(json[1].keypoints[6].position.y)
             + (Mx)^2 + (My)^2))))

             let LELLWR = Math.acos((2*(My)^2 + 2*(Mx)^2 - 2*(Mx)*(json[1].keypoints[7].position.x) - 2*(Mx)*(json[1].keypoints[9].position.x)
             - 4*(My)*(json[1].keypoints[7].position.y) + 2*(json[1].keypoints[7].position.x)*(xjson[1].keypoints[9].position.x)
            + 2*(json[1].keypoints[7].position.y)*(json[1].keypoints[9].position.y) + (json[1].keypoints[7].position.y)^2
            - (json[1].keypoints[9].position.y)^2)/2*(math.sqrt(((json[1].keypoints[7].position.x)^2 + (json[1].keypoints[7].position.y)^2 -
            2*(Mx)*(json[1].keypoints[7].position.x) - 2*(My)*(json[1].keypoints[7].position.y) + (Mx)^2 + (My)^2)((json[1].keypoints[9].position.x)^2
            + (json[1].keypoints[7].position.y)^2 - 2*(Mx)*(json[1].keypoints[9].position.x) - 2*(My)*(json[1].keypoints[7].position.y)
             + (Mx)^2 + (My)^2))))

             let RELRWR = Math.acos((2*(My)^2 + 2*(Mx)^2 - 2*(Mx)*(json[1].keypoints[8].position.x) - 2*(Mx)*(json[1].keypoints[10].position.x)
             - 4*(My)*(json[1].keypoints[8].position.y) + 2*(json[1].keypoints[8].position.x)*(xjson[1].keypoints[10].position.x)
            + 2*(json[1].keypoints[8].position.y)*(json[1].keypoints[10].position.y) + (json[1].keypoints[8].position.y)^2
            - (json[1].keypoints[10].position.y)^2)/2*(math.sqrt(((json[1].keypoints[8].position.x)^2 + (json[1].keypoints[8].position.y)^2 -
            2*(Mx)*(json[1].keypoints[8].position.x) - 2*(My)*(json[1].keypoints[8].position.y) + (Mx)^2 + (My)^2)((json[1].keypoints[10].position.x)^2
            + (json[1].keypoints[8].position.y)^2 - 2*(Mx)*(json[1].keypoints[10].position.x) - 2*(My)*(json[1].keypoints[8].position.y)
             + (Mx)^2 + (My)^2))))

             let LHILKN = Math.acos((2*(My)^2 + 2*(Mx)^2 - 2*(Mx)*(json[1].keypoints[11].position.x) - 2*(Mx)*(json[1].keypoints[13].position.x)
             - 4*(My)*(json[1].keypoints[11].position.y) + 2*(json[1].keypoints[11].position.x)*(xjson[1].keypoints[13].position.x)
            + 2*(json[1].keypoints[11].position.y)*(json[1].keypoints[13].position.y) + (json[1].keypoints[11].position.y)^2
            - (json[1].keypoints[13].position.y)^2)/2*(math.sqrt(((json[1].keypoints[11].position.x)^2 + (json[1].keypoints[11].position.y)^2 -
            2*(Mx)*(json[1].keypoints[11].position.x) - 2*(My)*(json[1].keypoints[11].position.y) + (Mx)^2 + (My)^2)((json[1].keypoints[13].position.x)^2
            + (json[1].keypoints[11].position.y)^2 - 2*(Mx)*(json[1].keypoints[13].position.x) - 2*(My)*(json[1].keypoints[11].position.y)
             + (Mx)^2 + (My)^2))))

             let RHIRKN = Math.acos((2*(My)^2 + 2*(Mx)^2 - 2*(Mx)*(json[1].keypoints[12].position.x) - 2*(Mx)*(json[1].keypoints[14].position.x)
             - 4*(My)*(json[1].keypoints[12].position.y) + 2*(json[1].keypoints[12].position.x)*(xjson[1].keypoints[14].position.x)
            + 2*(json[1].keypoints[12].position.y)*(json[1].keypoints[14].position.y) + (json[1].keypoints[12].position.y)^2
            - (json[1].keypoints[14].position.y)^2)/2*(math.sqrt(((json[1].keypoints[12].position.x)^2 + (json[1].keypoints[12].position.y)^2 -
            2*(Mx)*(json[1].keypoints[12].position.x) - 2*(My)*(json[1].keypoints[12].position.y) + (Mx)^2 + (My)^2)((json[1].keypoints[14].position.x)^2
            + (json[1].keypoints[12].position.y)^2 - 2*(Mx)*(json[1].keypoints[14].position.x) - 2*(My)*(json[1].keypoints[12].position.y)
             + (Mx)^2 + (My)^2))))

             let LKNLAN = Math.acos((2*(My)^2 + 2*(Mx)^2 - 2*(Mx)*(json[1].keypoints[13].position.x) - 2*(Mx)*(json[1].keypoints[15].position.x)
             - 4*(My)*(json[1].keypoints[13].position.y) + 2*(json[1].keypoints[13].position.x)*(xjson[1].keypoints[15].position.x)
            + 2*(json[1].keypoints[13].position.y)*(json[1].keypoints[15].position.y) + (json[1].keypoints[13].position.y)^2
            - (json[1].keypoints[15].position.y)^2)/2*(math.sqrt(((json[1].keypoints[13].position.x)^2 + (json[1].keypoints[13].position.y)^2 -
            2*(Mx)*(json[1].keypoints[13].position.x) - 2*(My)*(json[1].keypoints[13].position.y) + (Mx)^2 + (My)^2)((json[1].keypoints[15].position.x)^2
            + (json[1].keypoints[13].position.y)^2 - 2*(Mx)*(json[1].keypoints[15].position.x) - 2*(My)*(json[1].keypoints[13].position.y)
             + (Mx)^2 + (My)^2))))

             let RKNRAN = Math.acos((2*(My)^2 + 2*(Mx)^2 - 2*(Mx)*(json[1].keypoints[14].position.x) - 2*(Mx)*(json[1].keypoints[16].position.x)
             - 4*(My)*(json[1].keypoints[14].position.y) + 2*(json[1].keypoints[14].position.x)*(xjson[1].keypoints[16].position.x)
            + 2*(json[1].keypoints[14].position.y)*(json[1].keypoints[16].position.y) + (json[1].keypoints[14].position.y)^2
            - (json[1].keypoints[16].position.y)^2)/2*(math.sqrt(((json[1].keypoints[14].position.x)^2 + (json[1].keypoints[14].position.y)^2 -
            2*(Mx)*(json[1].keypoints[14].position.x) - 2*(My)*(json[1].keypoints[14].position.y) + (Mx)^2 + (My)^2)((json[1].keypoints[16].position.x)^2
            + (json[1].keypoints[14].position.y)^2 - 2*(Mx)*(json[1].keypoints[16].position.x) - 2*(My)*(json[1].keypoints[14].position.y)
             + (Mx)^2 + (My)^2))))



            //abs((youtube-player/8))



            json.forEach((arr, i) => {
                times[i] = arr[0];
            });

            let closestIndex = binarySearch(times, n, 0, times.length);
            console.log(json[closestIndex]);
        });
}

function angle_thing_that_works_sometimes(json);
