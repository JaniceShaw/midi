const barsDisplay = document.querySelector(".bars");
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
    crash:      [[[0,16]],[[0,8],[0,4],[0,2],[1,2]]],
    highHat:    [[[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]], [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]]],
    snare:      [[[0,4],[1,4],[0,4],[1,4]],[[0,4],[1,4],[0,4],[1,4]]],
    bass:       [[[1,4],[1,4],[1,4],[1,4]],[[1,4],[1,4],[1,4],[1,4]]],
    ride:       [],
    floorTom:   [],
    tom1:       [],
    tom2:       [],

    repeat:2,
    name: "Four on the floor",
    bars: 2,
}


const toPlay = (beat) =>{

    output += `<section><p class="title">${beat['name']}</p>`;
    const snare = beat['snare'];
    const bass = beat['bass'];
    const highHat = beat['highHat'];
    const crash = beat['crash'];

    // looping over given bars
    for(let i = 0; i < beat.bars; i++){
        output += "<span class='bar'>";

        if(crash[i]){
            console.log('crash', crash);
            output += "<div class='crash'>";
            for(let j = 0; j < crash[i].length; j++){
                output += `<span ${crash[i][j][0] ? null : 'class="rest"'} style="width:${20*crash[i][j][1]}px"> </span>`
            }
            output += "</div>"
        }

        if(highHat[i]){
            output += "<div class='highHat'>";
            for(let j = 0; j < highHat[i].length; j++){
                output += `<span ${highHat[i][j][0] ? null : 'class="rest"'} style="width:${20*highHat[i][j][1]}px"> </span>`
            }
            output += "</div>"
        }

        if(snare[i]){
            output += "<div class='snare'>";
            for(let j = 0; j < snare[i].length; j++){
                output += `<span ${snare[i][j][0] ? null : 'class="rest"'} style="width:${20*snare[i][j][1]}px"> </span>`
            }
            output += "</div>"
        }

        if(bass[i]){
            output += "<div class='bass'>";
            for(let j = 0; j < bass[i].length; j++){
                output += `<span ${bass[i][j][0] ? null : 'class="rest"'} style="width:${20*bass[i][j][1]}px"> </span>`
            }
            output += "</div>"
        }



        output += "</span>";
    }
   
    output += "</section>";
   
}

toPlay(tester);
toPlay(fourFloor);

display.innerHTML = output;