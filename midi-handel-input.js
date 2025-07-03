//  Handling MIDI Input (keypress etc.) //
let midi = null;  // global MIDIAccess object
console.log("top here hello");


// function onMIDISuccess(midiAccess) {
//   console.log("MIDI ready!");
//   midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)

onMIDIMessage = (event) => {
  console.log("top here hello 2");
    const noteInfo = document.querySelector(".noteInfo");
    console.log("hello",noteInfo);
    
    
    console.log("all", event);
    const device = event.currentTarget;
    const type = event.data[0];
    const note = event.data[1];
    const velocity = event.data[2];
    const time = event.timeStamp;
    // console.log("device info ", device);
    // console.log("note", time);
    noteInfo.innerHTML = `<p>id: ${device.id} - ${device.name}</p>
                            <p>type: ${type} - note:  ${note} - vel: ${velocity} - ${time}</p>`;
  
    let str =
      "MIDI message received at timestamp " +
      event.timeStamp +
      "[" +
      event.data.length +
      " bytes]: ";
    for (let i = 0; i < event.data.length; i++) {
      str += "0x" + event.data[i].toString(16) + " ";
    }
    console.log(str);
  }
  

  const startLoggingMIDIInput = (midiAccess, indexOfPort) => {
    midiAccess.inputs.forEach(function (entry) {
      entry.onmidimessage = onMIDIMessage;
    });
  }