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


