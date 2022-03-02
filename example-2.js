// check to see if browser supports midi
if (navigator.requestMIDIAccess) {
  console.log("Browser supports MIDI!");
  navigator.requestMIDIAccess().then(success, failure);
}

// set up audio -- nothing to do with midi
let context = new AudioContext(),
    oscillators = {};

function success(midi) {
  // console.log('yippee midi working!', midi);
  console.log("number of midi things", midi.inputs.size);
  let inputs = midi.inputs.values();
  console.log("inputs", inputs); // it' an iterator

  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    // each time there is a midi message call the onMIDIMessage function
    input.value.onmidimessage = onMIDIMessage;
  }
}

function failure() {
  console.log("fail you do not have a midi device");
}

function onMIDIMessage(message) {
  console.log("message data: ", message.data);
  // message.data[0] == type of event
  // types:  144 = noteOn, 128 = noteOff (see others...)
  // message.data[1] == key on the keyboard (0 - 127)
  // message.data[2] == velocity (range??)
  let frequency = midiNoteToFrequency(message.data[1])
  console.log('frequency', frequency);

  // check to see if key was pressed
  if(message.data[0] === 144 && message.data[2] > 0){
      playNote(frequency);
  }

  // check key releast
  if (message.data[0] === 128 || message.data[2] === 0) {
    stopNote(frequency);
}

}

// to turn key pressed to frequency
// 440 = the A above middle C (note 69)
function midiNoteToFrequency(note) {
  return Math.pow(2, (note - 69) / 12) * 440;
}


function playNote(frequency){
    console.log('play', frequency);
    oscillators[frequency] = context.createOscillator();
    oscillators[frequency].frequency.value = frequency;
    oscillators[frequency].connect(context.destination);
    oscillators[frequency].start(context.currentTime);

}

function stopNote(frequency){
    console.log('stop', frequency);
    oscillators[frequency].stop(context.currentTime);
    oscillators[frequency].disconnect();
}

// added so that will work as chrome stopped auto play... //
// One-liner to resume playback when user interacted with the page.
document.querySelector('button').addEventListener('click', function() {
    context.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });