const midiDiv = document.querySelector(".midi");

const getMidiInfo = () => {
  const midiAvailable = document.createElement("h2");

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else {
    const newContent = document.createTextNode(
      "Your browser does not support Midi 😭 Google Chrome will work. 🤓 "
    );
    midiAvailable.appendChild(newContent);
    midiDiv.appendChild(midiAvailable);
    return;
  }

  function onMIDISuccess(midi) {
    const newContent = document.createTextNode("MIDI ready! 😄");
    midiAvailable.appendChild(newContent);
    midiDiv.appendChild(midiAvailable);
    // calls function to display all device information
    listInputsAndOutputs(midi);
  }

  function onMIDIFailure(msg) {
    const newContent = document.createTextNode("Failed to get MIDI access   - " + msg);
    midiAvailable.appendChild(newContent);
    midiDiv.appendChild(midiAvailable);
  }
};

document.onload = getMidiInfo();

// List all MIDI inputs and outputs //
const listInputsAndOutputs = (midiAccess) => {
  const midiDevices = document.createElement("div");
  midiDevices.className = 'info';
  midiDiv.appendChild(midiDevices);

  const inputs = document.createElement("p");
  const outputs = document.createElement("p");
  inputs.innerText = `MIDI Inputs: ${midiAccess.inputs.size}`;
  outputs.innerText = `MIDI Outputs: ${midiAccess.outputs.size}`;

  midiDevices.appendChild(inputs);
  const currentInputs = document.createElement("ol");
  midiDevices.appendChild(currentInputs);

  midiDevices.appendChild(outputs);
  const currentOutputs = document.createElement("ol");
  midiDevices.appendChild(currentOutputs);

  console.log(midiAccess);

  for (let entry of midiAccess.inputs) {
    const input = entry[1];
    const newLi = document.createElement("li");
    const newContent = document.createTextNode(
      `ID: ${input.id} - ${input.manufacturer} - ${input.name} - ${input.state}`
    );
    newLi.appendChild(newContent);
    currentInputs.appendChild(newLi);
  }

  for (let entry of midiAccess.outputs) {
    const output = entry[1];
    const newLi = document.createElement("li");
    const newContent = document.createTextNode(
      `ID: ${output.id} - ${output.manufacturer} - ${output.name} - ${output.state}`
    );
    newLi.appendChild(newContent);
    currentOutputs.appendChild(newLi);
  }
};
// end //