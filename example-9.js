 function decodeMIDIMessage([status, data1, data2]) {
    console.log([status, data1, data2]);
    
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

      const result = { type, channel };

      if (type === "noteon" || type === "noteoff") {
        result.note = data1;
        result.noteName = midiNoteToName(data1);
        result.velocity = data2;
      }

      else if (type === "controlchange"){
        result.note = data1;
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

    const log = document.getElementById('log');

    navigator.requestMIDIAccess().then(midi => {
      for (const input of midi.inputs.values()) {
        input.onmidimessage = (event) => {
          const decoded = decodeMIDIMessage([...event.data]);
          const timestamp = new Date().toLocaleTimeString();
          log.textContent = `[${timestamp}] ${decoded.type.toUpperCase()}  Ch:${decoded.channel}  ${decoded.noteName || decoded.note}  Vel:${decoded.velocity ?? ''}\n` + log.textContent;
        };
      }
    }).catch(err => {
      log.textContent = 'Failed to access MIDI: ' + err;
    });