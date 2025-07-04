
//table test code
const controllableElements = [

    {
        type: "control",
        channel: "1",
        note: "60", //default value
        noteName: "C4", //default value
        velocity: "100", //default value

    },
    {
        type: "control",
        channel: "2",
        note: "60", //default value
        noteName: "C4", //default value
        velocity: "127", //default value

    }, {
        type: "control",
        channel: "3",
        note: "60", //default value
        noteName: "C4", //default value
        velocity: "80", //default value

    }, {
        type: "control",
        channel: "4",
        note: "60", //default value
        noteName: "C4", //default value
        velocity: "127", //default value

    },

];


function createTable() {

    const midiDiv = document.querySelector(".midi-div");

    //appends to midiDiv
    const controlsTable = document.createElement("table");
    //set up controller table
    const trHead = document.createElement("tr");

    //headers
    //Type
    const thType = document.createElement("th");
    const thTypeNode = document.createTextNode("Type");
    thType.appendChild(thTypeNode)
    //Channel
    const thCh = document.createElement("th");
    const thChNode = document.createTextNode("Channel");
    thCh.appendChild(thChNode);
    //Note
    const thNote = document.createElement("th");
    const thNoteNode = document.createTextNode("Note");
    thNote.appendChild(thNoteNode);
    //NoteName
    const thNoteName = document.createElement("th");
    const thNoteNameNode = document.createTextNode("NoteName");
    thNoteName.appendChild(thNoteNameNode);
    //velocity
    const thVel = document.createElement("th");
    const thVelNode = document.createTextNode("Velocity");
    thVel.appendChild(thVelNode);
    //the row
    midiDiv.appendChild(controlsTable).appendChild(trHead);

    trHead.appendChild(thType);
    trHead.appendChild(thCh);
    trHead.appendChild(thNote);
    trHead.appendChild(thNoteName);
    trHead.appendChild(thVel);

   
}

function fillTable(controllableElements) {

     const controlsTable = document.querySelector(".midi-div table");
    // make the table rows
    for (let i = 0; i < controllableElements.length; i++) {
        const tdType = document.createElement("td");
        const tdCh = document.createElement("td");
        const tdNote = document.createElement("td");
        const tdNoteName = document.createElement("td");
        const tdVol = document.createElement("td");

        const tr = document.createElement("tr");

        const tdTypeNode = document.createTextNode(controllableElements[i][1].type);
        const tdChNode = document.createTextNode(controllableElements[i][1].channel);
        const tdNoteNode = document.createTextNode(controllableElements[i][1].note);
        const tdNoteNameNode = document.createTextNode(controllableElements[i][1].noteName);
        const tdValueNode = document.createTextNode(controllableElements[i][1].velocity);
        // const tdControlNode = document.createTextNode(controllableElements[i].controller === null ? "" : controllableElements[i].controller);
        // const tdValueNode = document.createTextNode(controllableElements[i].value);

        tdType.appendChild(tdTypeNode);
        tdCh.appendChild(tdChNode);
        tdNote.appendChild(tdNoteNode)
        tdNoteName.appendChild(tdNoteNameNode);
        tdVol.appendChild(tdValueNode);

        tr.appendChild(tdType);
        tr.appendChild(tdCh);
        tr.appendChild(tdNote);
        tr.appendChild(tdNoteName);
        tr.appendChild(tdVol);

        controlsTable.appendChild(tr)
    }
}


//createTable(controllableElements);
////

// end table test code




const midiDevices = document.querySelector(".midiDevices");
const midiSupport = document.querySelector(".midiSupport");
const midiEvents = document.querySelector(".midiEvents");
createTable();
const midiInfo = {
    inputs: [],
    outputs: [],
    events: []
}

const getMidiInfo = () => {

    // Check if the browser supports MIDI access
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
        const newContent = document.createTextNode(
            "Your browser does not support Midi 😭 Google Chrome will work. 🤓 "
        );
        midiSupport.appendChild(newContent);
        return;
    }

    // If MIDI access is successful, this function is called
    // and it will display a message and call the function to list devices
    function onMIDISuccess(midi) {
        const newContent = document.createTextNode("MIDI ready! 😄");
        midiSupport.appendChild(newContent);
        // calls function to display all device information
        listInputsAndOutputs(midi);
        //handle midi events
        startLoggingMidiEvents(midi);
    }

    function onMIDIFailure(msg) {
        const newContent = document.createTextNode("Failed to get MIDI access   - " + msg);
        midiSupport.appendChild(newContent);
    }
};

document.onload = getMidiInfo();

// List all MIDI inputs and outputs //
const listInputsAndOutputs = (midiAccess) => {

    // Create a new div to hold the MIDI devices information and give it a class name of "info"
    const midiDevicesList = document.createElement("div");
    midiDevicesList.className = 'info';
    midiDevices.appendChild(midiDevicesList);
    // Create paragraphs to hold the inputs and outputs information
    const inputs = document.createElement("p");
    const outputs = document.createElement("p");
    midiDevicesList.appendChild(inputs);

    // create a ordered list for inputs and outputs
    const currentInputs = document.createElement("ol");
    midiDevicesList.appendChild(currentInputs);
    midiDevicesList.appendChild(outputs);
    const currentOutputs = document.createElement("ol");
    midiDevicesList.appendChild(currentOutputs);

    console.log("midi raw", midiAccess);

    for (let entry of midiAccess.inputs) {
        const input = entry[1];
        // push to info object - inputs
        midiInfo.inputs.push({ id: input.id, name: input.name, manufacturer: input.manufacturer, state: input.state });

        const newLi = document.createElement("li");
        const newContent = document.createTextNode(
            `ID: ${input.id} | ${input.manufacturer} | ${input.name} | ${input.state}`
        );
        newLi.appendChild(newContent);
        currentInputs.appendChild(newLi);
    }


    for (let entry of midiAccess.outputs) {
        const output = entry[1];

        // push to info object - outputs
        midiInfo.outputs.push({ id: output.id, name: output.name, manufacturer: output.manufacturer, state: output.state });

        const newLi = document.createElement("li");
        const newContent = document.createTextNode(
            `ID: ${output.id} | ${output.manufacturer} | ${output.name} | ${output.state}`
        );

        newLi.appendChild(newContent);
        currentOutputs.appendChild(newLi);
    }

    inputs.innerText = `MIDI Inputs:  ${midiInfo.inputs.length}`;
    outputs.innerText = `MIDI Outputs: ${midiInfo.outputs.length}`;


};

function onMIDIMessage(event, device) {
    console.log("midiInfo", midiInfo);

    const newData = [device, decodeMIDIMessage(event.data)];

    midiInfo.events.push(newData)

    
    midiEvents.innerHTML = JSON.stringify(midiInfo.events);

    function decodeMIDIMessage([status, data1, data2]) {
        const messageTypeNibble = status & 0xF0;
        const channel = (status & 0x0F) + 1;

        const messageTypes = {
            0x80: "noteoff",
            0x90: "noteon",
            0xA0: "polyaftertouch",
            0xB0: "controlchange",
            0xC0: "programchange",
            0xD0: "channelpressure",
            0xE0: "pitchbend"
        };

        const type = messageTypes[messageTypeNibble] || "unknown";

        const velocity = data2;
        const result = { type, channel, velocity };

        if (type === "noteon" || type === "noteoff") {
            result.note = data1;
            result.noteName = midiNoteToName(data1);
            result.velocity = data2;
        }

        return result;
    }

    function midiNoteToName(noteNumber) {
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const octave = Math.floor(noteNumber / 12) - 1;
        const note = notes[noteNumber % 12];
        return `${note}${octave}`;
    }

    fillTable(midiInfo.events);
}

function startLoggingMidiEvents(midiAccess) {
    midiAccess.inputs.forEach(function (entry) {
        const deviceName = entry.name; // or entry.manufacturer + ' ' + entry.name
        entry.onmidimessage = function (event) {
            onMIDIMessage(event, deviceName);
        };
    });
}