const displayDevice = document.querySelector(".selectedDevice");
const displayLowKey = document.querySelector(".low");
const displayHighKey = document.querySelector(".high");
const displaySummary = document.querySelector(".summary");

let deviceMsg = "";
let selectedDevice;

let lowText = "";
let lowKey;
let highText = "";
let highKey;

let setUp = true;

// check midi is available
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(success, failure);
} else {
  deviceMsg = "browser dose not support midi";
  displayDevice.innerHTML = deviceMsg;
}

function success(midi) {
  deviceMsg = "<span class='big'>1</span>- please select a device by pressing a key on the device.";
  displayDevice.innerHTML = deviceMsg;

  let inputs = midi.inputs.values();

  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage;
  }
}

function failure() {
  console.log("fail you do not have a midi device");
  deviceMsg = "No device found";
  displayDevice.innerHTML = deviceMsg;
}

const keys = 127;
const octaves = 10;
const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
// const allNotes = []; // [0,0,"C", 8] [key, octave, noteName, frequency]
const noteInfo = []; // [{key:0,oct:0,note:"C",freq:8},{}]

// 440 = the A above middle C (note 69)
function midiNoteToFrequency(key) {
  return Math.pow(2, (key - 69) / 12) * 440;
}

// make array of all keys with octave and note name
for (let i = 0; i <= octaves; i++) {
  let octave = i;
  let startKey = i * 12;
  let note = 0;

  for (let k = startKey; k <= startKey + 11 && k <= keys; k++) {
    //  allNotes.push([k, octave, noteNames[note], midiNoteToFrequency(k)]);
    noteInfo.push({
      key: k,
      oct: octave -1,
      note: noteNames[note],
      freq: midiNoteToFrequency(k),
    });
    note += 1;
  }
}
// console.log('object notes', noteInfo);

const getSummary = (low, high) => {
  const allNotes = noteInfo.slice(low.key, high.key + 1);
  // console.log("allNotes", allNotes);

  let summaryText = "<h3>Summary</h3>";

  // number of keys
  const totalKeys = allNotes.length;
  summaryText += `<p>Number of keys: ${totalKeys}</p>`;

  // number of octaves
  const totalOctaves = high.oct - low.oct;
  summaryText += `<p>Available octaves: ${totalOctaves}`;

  summaryText += "<p>Play your keyboard to see notes played:</p><ul class='notes'>";
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i].note.length > 1) {
      summaryText += `<li class='sharp' id=${allNotes[i].key}>`;
    } else {
      summaryText += `<li class=${allNotes[i].note} id=${allNotes[i].key}>`;
    }
    summaryText += `${allNotes[i].note}</li>`;
  }
  summaryText += "</ul>";

  displaySummary.innerHTML = summaryText;
};

function onMIDIMessage(message) {
  // setUp key presses
  if (setUp) {
    if (message.data[0] === 144 && message.data[2] > 0) {
      // select device and display selected device name
      if (selectedDevice === undefined) {
        selectedDevice = message.currentTarget;
        deviceMsg = `1- Device selected <b>${selectedDevice.manufacturer} - ${selectedDevice.name}</b>`;
        displayDevice.innerHTML = deviceMsg;
        // TODO: after device selected - make chosen device the only active device

        // 2 low key select
        lowText = "<span class='big'>2</span>- Please press the <b>lowest</b> key on your keyboard";
        displayLowKey.innerHTML = lowText;
      } else if (!lowKey) {
        //uses noteInfo array to get all note info
        lowKey = noteInfo[message.data[1]];
        lowText = `2- Low Key number ${lowKey.key} - Octave:${lowKey.oct} - Note:${lowKey.note} - Freq:${lowKey.freq}`;
        displayLowKey.innerHTML = lowText;

        // 3 highest key select
        highText = "<span class='big'>3</span>- Please press the <b>highest</b> key on your keyboard";
        displayHighKey.innerHTML = highText;
      } else {
        highKey = noteInfo[message.data[1]];
        highText = `3- High key number ${highKey.key} - Octave:${highKey.oct} - Note:${highKey.note}  - Freq:${highKey.freq}`;
        displayHighKey.innerHTML = highText;

        getSummary(lowKey, highKey);
        setUp = false;
      }
     
    }
  } else {
    //TODO: add error checking if key is outside of the low high set
    // normal key presses after setup
    let pressed;
    let released;

    // check to see what key was pressed and add sel class
    if (message.data[0] === 144 && message.data[2] > 0) {
      pressed = message.data[1];
      let sel = document.getElementById(pressed);
      sel.classList.add('sel');
    }

    // check key released and remove sel class
    if (message.data[0] === 128 || message.data[2] === 0) {
      released = message.data[1];
      let deSel = document.getElementById(released);
      deSel.classList.remove('sel');
    }
  }
}
