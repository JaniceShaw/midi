let midi = null;  // global MIDIAccess object

function onMIDISuccess( midiAccess ) {
  console.log( "MIDI ready!" );
  midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)

  // list inputs & outputs
  listInputsAndOutputs(midi);
  //handle midi input
  startLoggingMIDIInput(midi);
  //sending midi
  //sendMiddleC(midi, 1); // not sure how this should work
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}
// Not supported by safari
navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );

// Listing inputs and outputs //
function listInputsAndOutputs( midiAccess ) {
    for (let entry of midiAccess.inputs) {
      let input = entry[1];
      console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
        "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
        "'state:' " + input.state +
        "' version:'" + input.version + "'" );
    }
  
    for (var entry of midiAccess.outputs) {
      var output = entry[1];
      console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
        "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
        "' version:'" + output.version + "'" );
    }
  }

//  Handling MIDI Input //  
  function onMIDIMessage( event ) {
      console.log('data event: ', event.data);
    let str = "MIDI message received at timestamp " + event.timeStamp + "[" + event.data.length + " bytes]: ";
    for (let i=0; i<event.data.length; i++) {
      str += "0x" + event.data[i].toString(16) + " ";
    }
    console.log( str );
  }
  
  function startLoggingMIDIInput( midiAccess, indexOfPort ) {
    midiAccess.inputs.forEach( function(entry) {entry.onmidimessage = onMIDIMessage;});
  }


  // sending midi message //
//   This example sends a middle C note on message immediately on MIDI channel 1 (MIDI channels are 0-indexed, but generally referred to as channels 1-16), and queues a corresponding note off message for 1 second later.

function sendMiddleC( midiAccess, portID ) {
  let noteOnMessage = [0x90, 60, 0x7f];    // note on, middle C, full velocity
  let output = midiAccess.outputs.get(portID);
  output.send( noteOnMessage );  //omitting the timestamp means send immediately.
  output.send( [0x80, 60, 0x40], window.performance.now() + 1000.0 ); // Inlined array creation- note off, middle C,  
                                                                      // release velocity = 64, timestamp = now + 1000ms.
}


