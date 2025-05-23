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

const units = {
    highHatClosed:    [
                    [[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5],[1,0.5]],
                    [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]],
                ],
    highHatOpen:[],
    snare:      [
                    [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]],
                    [[1,4],[1,4],[1,4],[1,4]],
                ],
    bass:       [
                    [[1,8],[1,8]], 
                    [[1,16]],                
                ],

    ride:       [],
    crash:      [],
    floorTom:   [],
    tom1:       [],
    tom2:       [],

    repeat:0,
    name: "Example of units (32nd to whole note)",
    bars: 2,
   
}

const fourFloor = {
    crash:      [
                    [[0,16]],
                    [[0,16]],
                    [[1,2],[0,2],[0,4],[0,8]],
                    [[0,16]]
                ],
    ride:       [],
    highHatOpen: [],
    highHatClosed:    [
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

    repeat:0,
    name: "Four on the floor",
    bars: 4,
    level:1,
    category:"beat"
}

const rumble = {
    crash:      [],
    ride:       [
                    [[1,3],[1,3],[1,3]],
                    [[1,3],[1,3],[1,3]],
                    [[1,3],[1,3],[1,3]],
                    [[1,3],[1,3],[1,3]],
                ],
    highHatClosed:    [],
    highHatOpen:    [],
    snare:      [
                    [[0,9]],
                    [[1,3],[0,3],[0,3]],
                    [[0,9]],
                    [[1,3],[0,3],[0,3]],
                ],
                
    bass:       [
                    [[1,3],[0,3],[0,3]],
                    [[0,9]],
                    [[1,3],[0,3],[0,3]],
                    [[0,3],[0,3],[1,3]],
                ],
    floorTom:   [],
    tom1:       [],
    tom2:       [],

    repeat:0,
    name: "Rumble (triplets)",
    bars: 4,
    level:1,
    category:"song",
}

const toPlay = (beat) =>{
    output += `<section><p class="title">${beat['name']}</p>`;
    const allDrums = {
        crash : beat['crash'],
        ride : beat['ride'],
        highHatOpen : beat['highHatOpen'],
        highHatClosed : beat['highHatClosed'],
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
                    output += `<span ${value[i][j][0] ? '':'class="rest"'} style="width:${20*value[i][j][1]}px"> </span>`; 
                }
                output += "</div>"
            }       
        }
        output += "</span>";
    }
    output += "</section>";
}

toPlay(units);
toPlay(fourFloor);
toPlay(rumble);

display.innerHTML = output;
