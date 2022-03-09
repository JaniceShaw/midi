const body = document.querySelector("body");
const display = document.querySelector(".display");
const btn = document.querySelector("button");
// get all drums in dom
const snareDrum = document.querySelector('.snare');
const bassDrum = document.querySelector('.bass');
const highHatDrum = document.querySelector('.highHat');
const floorTomDrum = document.querySelector('.floorTom');
const tom1Drum = document.querySelector('.tom1');
const tom2Drum = document.querySelector('.tom2');
const crashDrum = document.querySelector('.crash');
// const footSwitch = document.querySelector('.footSwitch');


let deviceMsg = "";

// check midi is available
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(success, failure);
} else {
  deviceMsg = "Your browser dose not support midi";
  display.innerHTML = deviceMsg;
}

function success(midi) {
  deviceMsg = "<span class='big'>0</span> - Click start to start set up";
  display.innerHTML = deviceMsg;
  let inputs = midi.inputs.values();
  btn.addEventListener("click", drumSet.nextStep);

  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage;
  }
}

function failure() {
  console.log("fail you do not have a midi device");
  deviceMsg = "No device found";
  display.innerHTML = deviceMsg;
}

const drumSet = {
  setUp: 0,
  snare: undefined, // 1
  bass: undefined, // 2
  highHat: undefined, // 3
  highHatFoot: undefined, // optional - 4
  crash: undefined, // optional - 5
  floorTom: undefined, //optional 6
  tom1: undefined, // optional - 7 
  tom2: undefined, // optional - 8  

  // set up button progress
  nextStep: function(){
    let msg = "";
    drumSet.setUp += 1;

    switch(drumSet.setUp){
      case 1:
        msg = `1- Please hit the snare drum`;
        display.innerHTML = msg;
        btn.innerText = "next";
        btn.disabled = true;
      break;
      case 2:
        msg = `2- Please hit the bass drum`;
        display.innerHTML = msg;
        btn.disabled = true;
      break;
      case 3:
        msg = `3- Please hit the high hat`;
        display.innerHTML = msg;
        btn.disabled = true;
      break;
      case 4:
        msg = `4- Please activate the high hat foot pedal`;
        display.innerHTML = msg;
        btn.disabled = true;
      break;
      case 5:
        msg = `5- Please hit the crash cymbal`;
        display.innerHTML = msg;
        btn.disabled = true;
      break;
      case 6:
        msg = `6- Please hit the floor tom`;
        display.innerHTML = msg;
        btn.disabled = true;
      break;
      case 7:
        msg = `7- Please hit tom 1`;
        display.innerHTML = msg;
        btn.disabled = true;
      break;
      case 8:
        msg = `8- Please hit tom 2`;
        display.innerHTML = msg;
        btn.disabled = true;
      break;
      case 9:
        msg = `9- Finished setup`;
        display.innerHTML = msg;
        // btn.disabled = true;
        console.log('case 9 on button');
      break;
    }
  },
}

const playDrum = (note)=>{
  switch(note){
    case drumSet.snare:
      console.log('snare');
      snareDrum.classList.add('active');
    break;
    case drumSet.bass:
      console.log('bass');
      bassDrum.classList.add('active');
    break;
    case drumSet.highHat:
      console.log('high hat');
      highHatDrum.classList.add('active');
    break;
    case drumSet.highHatFoot:
      console.log('high hat foot');
    break;
    case drumSet.crash:
      console.log('crash');
      crashDrum.classList.add('active');
    break;
    case drumSet.floorTom:
      console.log('floor tom');
      floorTomDrum.classList.add('active');
    break;
    case drumSet.tom1:
      console.log('tom1');
      tom1Drum.classList.add('active');
    break;
    case drumSet.tom2:
      console.log('tom2');
      tom2Drum.classList.add('active');
    break;
  }
}

const StopPlayDrum = (note)=>{
  switch(note){
    case drumSet.snare:
      console.log('off snare');
      snareDrum.classList.remove('active');
    break;

    case drumSet.bass:
      console.log('off bass');
      bassDrum.classList.remove('active');
    break;

    case drumSet.highHat:
      console.log('oof high hat');
      highHatDrum.classList.remove('active');
    break;

    case drumSet.highHatFoot:
      console.log('oof high hat foot');
    break;

    case drumSet.crash:
      console.log('off crash');
      crashDrum.classList.remove('active');
    break;

    case drumSet.floorTom:
      console.log('off floor tom');
      floorTomDrum.classList.remove('active');
    break;

    case drumSet.tom1:
      console.log('off tom1');
      tom1Drum.classList.remove('active');
    break;

    case drumSet.tom2:
      console.log('off tom2');
      tom2Drum.classList.remove('active');
    break;
  }
}

function onMIDIMessage(message) {
  const padId = message.data[1];
  if(message.data[0] !== 254 && message.data[0] !== 248){
    console.log(message.data[0]);
  }
  
  // setUp
    if ((message.data[0] === 144 || message.data[0] === 153) && drumSet.setUp > 0 && message.data[2] > 0) { // change 144 to 153, - 137 is off - high-hat-foot = 185
      
      console.log('0',message.data[0]);
      console.log('all', message);

      switch(drumSet.setUp){
        // snare
        case 1:
          btn.disabled = false;
          drumSet.snare = padId;
          msg = `Pad id <strong> ${padId}</strong> selected, click next to confirm`;
          display.innerHTML = msg;
        break;
        // bass
        case 2:
          if(padId === drumSet.snare){
            msg = `Drum pad already in use please hit a different pad.`;
            display.innerHTML = msg;
            btn.disabled = true;
          }else{
            drumSet.bass = padId;
            btn.disabled = false;
            msg = `Pad id <strong> ${padId}</strong> selected, click next to confirm`;
            display.innerHTML = msg;
          }
        break;
        // high hat
        case 3:
          if(padId === drumSet.snare || padId === drumSet.bass){
            msg = `Drum pad already in use please hit a different pad.`;
            display.innerHTML = msg;
            btn.disabled = true;
          }else{
            drumSet.highHat = padId;
            btn.disabled = false;
            msg = `Pad id <strong> ${padId}</strong> selected, click next to confirm`;
            display.innerHTML = msg;
          }
        break;
        // high hat foot
        case 4:
          if(padId === drumSet.snare || padId === drumSet.bass || padId === drumSet.highHat){
            msg = `Drum pad already in use please hit a different pad.`;
            display.innerHTML = msg;
            btn.disabled = true;
          }else {
            drumSet.highHatFoot = padId;
            btn.disabled = false;
            msg = `Pad id <strong> ${padId}</strong> selected, click next to confirm`;
            display.innerHTML = msg;
          }
        break;
        // crash
        case 5:
          if(padId === drumSet.snare || padId === drumSet.bass || padId === drumSet.highHat || padId === drumSet.highHatFoot){
            msg = `Drum pad already in use please hit a different pad.`;
            display.innerHTML = msg;
            btn.disabled = true;
          }else{
            drumSet.crash = padId;
            btn.disabled = false;
            msg = `Pad id <strong> ${padId}</strong> selected, click next to confirm`;
            display.innerHTML = msg;
        }
        break;
         // floor tom
         case 6:
          if(padId === drumSet.snare || padId === drumSet.bass || padId === drumSet.highHat || padId === drumSet.highHatFoot || padId === drumSet.crash){
            msg = `Drum pad already in use please hit a different pad.`;
            display.innerHTML = msg;
            btn.disabled = true;
          }else {
            drumSet.floorTom = padId;
            btn.disabled = false;
            msg = `Pad id <strong> ${padId}</strong> selected, click next to confirm`;
            display.innerHTML = msg;
        }
        break;
         // tom 1
         case 7:
          if(padId === drumSet.snare || padId === drumSet.bass || padId === drumSet.highHat || padId === drumSet.highHatFoot || padId === drumSet.crash || padId === drumSet.floorTom){
            msg = `Drum pad already in use please hit a different pad.`;
            display.innerHTML = msg;
            btn.disabled = true;
          }else  {
            drumSet.tom1 = padId;
            btn.disabled = false;
            msg = `Pad id <strong> ${padId}</strong> selected, click next to confirm`;
            display.innerHTML = msg;
          }
          break;
          // tom 2
          case 8:
            if(padId === drumSet.snare || padId === drumSet.bass || padId === drumSet.highHat || padId === drumSet.highHatFoot || padId === drumSet.crash || padId === drumSet.floorTom || padId === drumSet.tom1){
              msg = `Drum pad already in use please hit a different pad.`;
              display.innerHTML = msg;
              btn.disabled = true;
              console.log('tom2 already used');
            }else {
              drumSet.tom2 = padId;
              btn.disabled = false;
              msg = `Pad id <strong> ${padId}</strong> selected, click next to confirm`;
              display.innerHTML = msg;
              console.log('made it to set tom2');
            }
          break;
          // set up finished play drums 
          default:
            display.innerHTML = 'Play!';
            btn.disabled = false;
            btn.style = "display:none";
           
            playDrum(padId); 
          break; 
      }
      
    }
    //note off after setup -- drum note off is 137 / keyboard note off is 128
    if(message.data[0] === 128 || message.data[0 ] === 137 || message.data[2] === 0){
      // drum note off
      console.log('in note off', padId);
      StopPlayDrum(padId);
    }
 }
