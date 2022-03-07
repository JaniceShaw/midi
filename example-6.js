const body = document.querySelector("body");
const display = document.querySelector(".display");
const colourDisplay = document.querySelector(".colour span");
const btn = document.querySelector("button");

let setUp = 0;
let redControl;
let greenControl;
let blueControl;
let alphaControl;

let r = 0; // 0 - 255
let g = 0;
let b = 0;
let a = 1; // 0 - 1

// midi controller 0 - 127
//colour value from controller
const rgbValue = (value) => {
  const max = 255;
  const controllerMax = 127;
  const unit = max / controllerMax;
  return Math.round(unit * value);
};

const aValue = (value) => {
  const max = 1;
  return (max / 127) * value;
};

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

  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage;
  }
}

function failure() {
  console.log("fail you do not have a midi device");
  deviceMsg = "No device found";
  display.innerHTML = deviceMsg;
}

// set up button progress
const nextStep = () => {
  setUp += 1;
  console.log("setup", setUp);
  if (setUp === 1) {
    msg = `1- Please move the controller for the Red value`;
    display.innerHTML = msg;
    btn.innerText = "next";
    btn.disabled = true;
  }
  else if (setUp === 2) {
    msg = `2- Please move the controller for the Green value`;
    display.innerHTML = msg;
    btn.innerText = "next";
    btn.disabled = true;
  }
  else if (setUp === 3) {
    msg = `3- Please move the controller for the Blue value`;
    display.innerHTML = msg;
    btn.innerText = "next";
    btn.disabled = true;
  }
  else if (setUp === 4) {
    msg = `4- Please move the controller for the Alpha value`;
    display.innerHTML = msg;
    btn.innerText = "next";
    btn.disabled = true;
  }
  else if (setUp === 5) {
    msg = `Set up completed, please move selected controllers to change the background colour`;
    display.innerHTML = msg;
    btn.innerText = "next";
    btn.disabled = true;
    btn.display = false;
  }
};

btn.addEventListener("click", nextStep);

function onMIDIMessage(message) {
  // setUp
    if (message.data[0] === 176 && setUp > 0) {
        // 1  select red controller
        if (setUp === 1) {
            console.log("red controller moved", message.data[1]);
            btn.disabled = false;
            btn.innerText = "next";
            redControl = message.data[1];
            msg = `Controller id <strong> ${message.data[1]}</strong> selected, click next to confirm`;
            display.innerHTML = msg;
        }
        // 2 select green controller
        else if (setUp === 2) {
            if(message.data[1] === redControl){
                msg = `Controller already being used for RED please move a different controller.`;
                display.innerHTML = msg;
                btn.disabled = true;
            }else  {
                console.log("green controller moved", message.data[1]);
                greenControl = message.data[1];
                btn.disabled = false;
                btn.innerText = "next";
                msg = `Controller id <strong> ${message.data[1]}</strong> selected, click next to confirm`;
                display.innerHTML = msg;
          }
        }
         // 3 select blue controller
        else if (setUp === 3) {
            if(message.data[1] === redControl || message.data[1] === greenControl){
                msg = `Controller already in use please move a different controller.`;
                display.innerHTML = msg;
                btn.disabled = true;
            }else  {
                console.log("blue controller moved", message.data[1]);
                blueControl = message.data[1];
                btn.disabled = false;
                btn.innerText = "next";
                msg = `Controller id <strong> ${message.data[1]}</strong> selected, click next to confirm`;
                display.innerHTML = msg;
            }   
        }
        // 4 select alpha controller
        else if (setUp === 4) {
            if(message.data[1] === redControl || message.data[1] === greenControl || message.data[1] === blueControl){
                msg = `Controller already in use please move a different controller.`;
                display.innerHTML = msg;
                btn.disabled = true;
            }else  {
                console.log("alpha controller moved", message.data[1]);
                alphaControl = message.data[1];
                btn.disabled = false;
                btn.innerText = "next";
                msg = `Controller id <strong> ${message.data[1]}</strong> selected, click next to confirm`;
                display.innerHTML = msg;
            }   
        }else{
            //change background colour!! :-)
            //set the values for each chosen controller
            if(message.data[1] === redControl){
                console.log('red',message.data[2]);
                r = rgbValue(message.data[2]);
                body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
                colourDisplay.innerText = `rgba(${r}, ${g}, ${b}, ${a})`;
            }
            if(message.data[1] === greenControl){
                console.log('green',message.data[2]);
                g = rgbValue(message.data[2]);
                body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
                colourDisplay.innerText = `rgba(${r}, ${g}, ${b}, ${a})`;
            }
            if(message.data[1] === blueControl){
                console.log('blue',message.data[2]);
                b = rgbValue(message.data[2]);
                body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
                colourDisplay.innerText = `rgba(${r}, ${g}, ${b}, ${a})`;
            }
            if(message.data[1] === alphaControl){
                console.log('alpha',message.data[2]);
                a = aValue(message.data[2]);
                body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
                colourDisplay.innerText = `rgba(${r}, ${g}, ${b}, ${a})`;
            }

        }
    }
 }
