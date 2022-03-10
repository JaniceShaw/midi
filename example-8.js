const display = document.querySelector(".display");
let output = "";

// 16 = whole note
// 8 = half note
// 4 = quarter note
// 2 = eighth note
// 1 = sixteenth note
// 0.5 -- not going up to this -- thirty-second note -- (don't think i need this)
// 1 bar must = 16
// rests [0,] play note[1,]

const tester = {
    snare:  [[[1,16]], [[1,8],[1,8]], [[1,4],[0,4],[1,4],[0,4]], [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]], [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]]],
    bass:   [[[1,4],[1,4],[1,4],[1,4]],[[1,4],[1,2],[1,2],[1,4],[1,4]],[[0,16]],[[0,16]],[[0,16]]],
    highHat:[],
    ride:   [],
    crash:[],
    floorTom:   [],
    tom1:       [],
    tom2:       [],

    repeat:2,
    name: "Example of units",
    bars: 5,
   
}

const fourFloor = {
    crash:      [
                    [[0,16]],
                    [[0,16]],
                    [[1,2],[0,2],[0,4],[0,8]],
                    [[0,16]]
                ],
    ride:       [],
    highHat:    [
                    [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]], 
                    [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]],
                    [[0,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]], 
                    [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]]
                ],
    snare:      [
                    [[0,4],[1,4],[0,4],[1,4]],
                    [[0,4],[1,4],[0,4],[1,4]],
                    [[0,4],[1,4],[0,4],[1,4]],
                    [[0,4],[1,4],[0,4],[1,4]]
                ],
    bass:       [
                    [[1,4],[1,4],[1,4],[1,4]],
                    [[1,4],[1,4],[1,4],[1,4]],
                    [[1,4],[1,4],[1,4],[1,4]],
                    [[1,4],[1,4],[1,4],[1,4]]
                ],

    floorTom:   [],
    tom1:       [],
    tom2:       [],

    repeat:2,
    name: "Four on the floor",
    bars: 4,
    level:1,
}

const toPlay = (beat) =>{
    output += `<section><p class="title">${beat['name']}</p>`;
    const allDrums = {
        crash : beat['crash'],
        ride : beat['ride'],
        highHat : beat['highHat'],
        tom1 : beat['tom1'],
        tom2 : beat['tom1'],
        snare : beat['snare'],
        floorTom : beat['floorTom'],
        bass : beat['bass']
    }

    // looping over given bars
    for(let i = 0; i < beat.bars; i++){
        output += `<span class='bar'> <span>${i+1}</span>`;
        // loop over allDrums to display defined drums
        for (let [drum, value] of Object.entries(allDrums)) {
            if(value.length > 0){
                output += `<div class=${drum}>`;
                for(let j = 0; j < value[i].length; j++){
                    output += `<span ${value[i][j][0] ? null : 'class="rest"'} style="width:${20*value[i][j][1]}px"> </span>`; 
                }
                output += "</div>"
            }       
        }
        output += "</span>";
    }
    output += "</section>";
}

// toPlay(tester);
toPlay(fourFloor);

display.innerHTML = output;
