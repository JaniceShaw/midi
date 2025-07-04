const controllableElements = [

    {
        displayName: "Type",
        value: "", //default value

    },
    {
        displayName: "Channel",
        value:"", //default value
    },
    {
        displayName: "note",
        value: "", //default value
    },
    {
        displayName: "noteName",
        value: "", //default value
    },
    {
        displayName: "Velocity",
        value: "", //default value
    },
    
];



export function midiSetup(controllableElements) {
//   const { controllableElements, setup, manager } = midiSettings;

  console.log("loaded midi setup", controllableElements);

  // html elements
  const body = document.querySelector("body");
  const midiDiv = document.createElement("div");
  midiDiv.className = "midi-div";
  const midiSetupDisplay = document.createElement("div");
  midiDiv.appendChild(midiSetupDisplay);
  body.appendChild(midiDiv);

  const midiButton = document.createElement("button");
  midiButton.className = "midi-btn";
  midiButton.innerText = "setup";

  midiDiv.appendChild(midiButton);

  let deviceMsg, msg;

  createTable(controllableElements);
  // styles for the midi setup
  const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;
  // Usage: 
  addCSS(`
          body{ background:black; font-family:"Courier New";font-size:11px}
          table{
              border:solid 1px black;
              display:block;
              position:relative;
            }
            th,td{border-bottom:solid 1px black;border-right:solid 1px black;}
            td:last-of-type{border-right:none;}
            tr:last-of-type td{border-bottom:none;}
            .midi-div{background-color:lightgrey}
          `);

  // value from controller -- re-map controller values to the min max of element
//   const mapValues = ({ max = 255, min = 0, value, formatting = "" }) => {
//     const controllerMax = 127; // midi controller 0 - 127
//     const unit = (max - min) / controllerMax;

//     if (formatting === "round") { return Math.round((unit * value) + min); }
//     if (formatting === "floor") { return Math.floor((unit * value) + min); }
//     if (formatting === "fixed1") {
//       const output = (unit * value) + min;
//       return output.toFixed(1);
//     }
//     if (formatting === "fixed2") {
//       const output = (unit * value) + min;
//       return output.toFixed(2);
//     }

//     return (unit * value) + min;
//   };

//   if (navigator.requestMIDIAccess) {
//     navigator.requestMIDIAccess().then(success, failure);
//   } else {
//     deviceMsg = "Your browser dose not support midi";
//     midiSetupDisplay.innerHTML = deviceMsg;
//   }

  // browser supports midi setup
  function success(midi) {
    deviceMsg = "Use midi controller";
    midiSetupDisplay.innerHTML = deviceMsg;

    let inputs = midi.inputs.values();

    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = onMIDIMessage;
    }
  }

  function failure() {
    console.log("fail you do not have a midi device");
    deviceMsg = "No device found";
    midiSetupDisplay.innerHTML = deviceMsg;
  }

//   let setUp = setup ? 2 : 0; // to check if want to use predefined setup
//   let setUpStage = 0;

  // set up button progress
  const nextStep = () => {
    setUp = 1;

    if (setUpStage < controllableElements.length && setUp !== 2) {
      setUpStage += 1;
      msg = `Select ${controllableElements[setUpStage - 1].displayName} controller`;
      midiSetupDisplay.innerHTML = msg;
      midiButton.innerText = "next";
      midiButton.disabled = true;
    }
    else if (setUpStage >= controllableElements.length) {
      setUp = 2;
      msg = `Finished`;
      midiSetupDisplay.innerHTML = msg;
      midiButton.innerText = "next";
      midiButton.disabled = true;
      midiButton.display = false;
    }
  };

  midiButton.addEventListener("click", nextStep);



  function onMIDIMessage(message) {
    // if controller is moved
    // check if in setup or in use else do nothing
    //console.log(message.data);
    if ((message.data[0] === 176 || message.data[0] === 177 || message.data[0] === 185) && setUp !== 0) {
      // 1  select controller

      if (setUpStage < controllableElements.length + 1 && setUp !== 2) {
        controllableElements[setUpStage - 1].controller = message.data[1];
        midiButton.disabled = false;
        midiButton.innerText = "next";
        msg = `controller #${message.data[1]} selected`;
        midiSetupDisplay.innerHTML = msg;
        //recreate controller table
        document.querySelector("table").remove();
        createTable(controllableElements);
      }
      // use controller
      else {
        //set the values for each chosen controller
        for (let i = 0; i < controllableElements.length; i++) {

          if (message.data[1] === controllableElements[i].controller) {
            /// set value in array
            controllableElements[i].value = mapValues({
              max: controllableElements[i].maxValue,
              min: controllableElements[i].minValue,
              value: message.data[2],
              formatting: controllableElements[i].formatting,
            });
          }
        }
        //recreate controller table to display new values
        document.querySelector("table").remove();
        createTable(controllableElements);
        // re-render to show changed values
        manager.render();

      }
    }

  }
  return
}









export function createTable(controllableElements) {

  const midiDiv = document.querySelector(".midi-div");

  //appends to midiDiv
  const controlsTable = document.createElement("table");
  //set up controller table
  const trHead = document.createElement("tr");
  //headers
  const thIndex = document.createElement("th");
  const thIndexNode = document.createTextNode("index");
  thIndex.appendChild(thIndexNode)
  const thName = document.createElement("th");
  const thNameNode = document.createTextNode("name");
  thName.appendChild(thNameNode);
  const thControl = document.createElement("th");
  const thControlNode = document.createTextNode("controller");
  thControl.appendChild(thControlNode);
  const thValue = document.createElement("th");
  const thValueNode = document.createTextNode("value");
  thValue.appendChild(thValueNode);

  midiDiv.appendChild(controlsTable).appendChild(trHead);

  trHead.appendChild(thIndex);
  trHead.appendChild(thName);
  trHead.appendChild(thControl);
  trHead.appendChild(thValue);


  // make the table rows
  for (let i = 0; i < controllableElements.length; i++) {
    const tdIndex = document.createElement("td");
    const tdName = document.createElement("td");
    const tdControl = document.createElement("td");
    const tdValue = document.createElement("td");
    const tr = document.createElement("tr");

    const tdIndexNode = document.createTextNode(i);
    const tdNameNode = document.createTextNode(controllableElements[i].displayName);
    const tdControlNode = document.createTextNode(controllableElements[i].controller === null ? "" : controllableElements[i].controller);
    const tdValueNode = document.createTextNode(controllableElements[i].value);

    tdIndex.appendChild(tdIndexNode);
    tdName.appendChild(tdNameNode);
    tdControl.appendChild(tdControlNode)
    tdValue.appendChild(tdValueNode);

    tr.appendChild(tdIndex);
    tr.appendChild(tdName);
    tr.appendChild(tdControl);
    tr.appendChild(tdValue);
    controlsTable.appendChild(tr)
  }
}


