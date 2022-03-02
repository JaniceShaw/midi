// -- note key = key on keyboard --
// octaves 0 - 10
// notes C - B
// keys 0 - 127
// 12 keys in an octave

const display = document.querySelector('.display');

const keys = 127;
const octaves = 10;
const noteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const allNotes = []; // [0,0,"C", 8] [key, octave, noteName, frequency]

// to turn key pressed to frequency
// 440 = the A above middle C (note 69)
function midiNoteToFrequency(key) {
  return Math.pow(2, (key - 69) / 12) * 440;
}

// make array of all keys with octave and note name
 for(let i = 0; i <= octaves; i ++){
    let octave = i;
    let startKey = i * 12;
    let count = 0;

    for(let j = startKey; j<= startKey + 11 && j <= keys; j++){

     allNotes.push([j, octave, noteNames[count], midiNoteToFrequency(j)]);
     count +=1;

    }
 }

 console.log(allNotes);
 let output = "";

 for(let i = 0; i < allNotes.length; i++){
   output = output + "<li>#:" + allNotes[i][0] + " - Octave:" + allNotes[i][1] + " - Note:" + allNotes[i][2] + " - Frequency:" + Math.round(allNotes[i][3])
 }
 display.innerHTML = output;

 // get available playable keyboard keys
 // get lowest note
 let loweNote = "0";
 // get highest note
 let highNote = "127";
 