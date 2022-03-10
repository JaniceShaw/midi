const barsDisplay = document.querySelector(".bars");
const display = document.querySelector(".display");

const beat1 = {
  bars: [
    ["s", "s", "s", "s"],
    [
      ["t1", "t1"],
      ["t2", "t2"],
      ["ft", "ft"],
      ["ft", "ft"],
    ], // bars[[1,2,3,4],[1,and,2,and,3,and,4]]
  ],
  repeat: 4,
  name: "First beat",
};

const beat2 = {
  bars: [
    [["s", "s", "s", "s"]],
    [
      ["s", "s"],
      ["s", "s"],
      ["s", "s"],
      ["s", "s"],
    ], // bars[[1,2,3,4],[1,and,2,and,3,and,4]]
    [
      ["s", "s"],
      ["s", "s"],
      ["s", "s"],
      ["s", "s"],
    ], // bars[[1,2,3,4],[1,and,2,and,3,and,4]]
    [["s", "s", "s", "s"]],
  ],
  repeat: 4,
  name: "second version",
};

const beat3 = {
  bars: [
    'whole',
    // [1/2, 1/4, 0.5]
    ['half', 'half'],
    ['half'[['sx','sx'],'qu']],
    ["qu", "qu", "qu", "qu"],
    [["sx", "sx"],["sx", "sx"],["sx", "sx"],["sx", "sx"],
    ], // bars[[1,2,3,4],[1,and,2,and,3,and,4]]

    [
      [["s"], ["s"]],
      [["s"], ["s"]],
      [["s"], ["s"]],
      [["s"], ["s"]],
    ], // bars[[1,2,3,4],[1,and,2,and,3,and,4]]
  ],
  repeat: 4,
  name: "First beat",
};

const beatInfo = (beat) => {
  let numberOfBars;
  let msg = "";

  // loop bars
  for (let i = 0; i < beat.bars.length; i++) {
    msg += "<span class='bar'>";
    numberOfBars = i + 1;
    if(Array.isArray(beat.bars[i])){
    // loops whole notes
    for (let j = 0; j < beat.bars[i].length; j++) {
      if (Array.isArray(beat.bars[i][j])) {
        // loops half notes
        for (k = 0; k < beat.bars[i][j].length; k++) {
          if (Array.isArray(beat.bars[i][j][k])) {
            // loops quarter nots
            for (let m = 0; m > beat.bars[i][j][k].length; m++) {
              // returns beats quarter notes
              msg += `<span class="half ${beat.bars[i][j][k][m]}">${beat.bars[i][j][k][m]}</span>`;
            }
            console.log("beats-half", beat.bars[i][j][k]);
          } else {
            //returns beats half notes
            msg += `<span class="half ${beat.bars[i][j][k]}">${beat.bars[i][j][k]}</span>`;
            // console.log('not array',beat.bars[i][j][k])
          }
        }
        console.log("beats-whole", beat.bars[i][j]);
      } else {
        // returns beats whole notes
        msg += `<span class=" ${beat.bars[i][j]}">${beat.bars[i][j]}</span>`;
        // console.log('not array',beat.bars[i][j]);
      }
    }
}else{
    msg += `<span class="whole ${beat.bars[i]}">${beat.bars[i]}</span>`;

}
msg += "</span>";
  } // end bars loop
  
  
  display.innerHTML = msg;
  barsDisplay.innerHTML = `Bars: ${numberOfBars}`;
};

beatInfo(beat3);
