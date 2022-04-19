class Registrant {
    constructor(registrant, age) {
      this.registrant = registrant;
      this.age = age;
    }
  }
  
  class Group {
    constructor(id, registrant) {
      this.id = id;
      this.registrant = registrant;
      this.registrants = [];
    }
  
    addRegistrant(registor) {
      this.registrants.push(registor);
    }
  
    deleteRegistrant(registor) {
      let index = this.registrants.indexOf(registor);
      this.registrants.splice(index, 1);
    }
  }
  
  let groups = [];
  let groupId = 0;
  
  onClick('new-group', () => {
    groups.push(new Group(groupId++, getValue('new-group-name')));
    drawDOM();
  });
  
  function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
  }
  
  function getValue(id) {
    return document.getElementById(id).value;
  }
  
  function drawDOM() {
    let groupDiv = document.getElementById('groups');
    clearElement(groupDiv);
    for (group of groups) {
      let table = createGroupTable(group);
      let title = document.createElement('h2');
      title.innerHTML = group.registrant;
      title.appendChild(createDeleteGroupButton(group));
      groupDiv.appendChild(title);
      groupDiv.appendChild(table);
      for (registor of group.registrants) {
        createRegistrantRow(group, table, registor);
      }
    }
  }
  
  function createRegistrantRow(group, table, registor) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = registor.registrant;
    row.insertCell(1).innerHTML = registor.age;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(group, registor));
  }
  
  function createDeleteRowButton(group, registor) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
      let index = group.registrants.indexOf(registor);
      group.registrants.splice(index, 1);
      drawDOM();
    };
    return btn;
  }
  
  function createDeleteGroupButton(group) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Group';
    btn.onclick = () => {
      let index = groups.indexOf(group);
      groups.splice(index, 1);
      drawDOM();
    };
    return btn;
  }
  
  function createNewRegistrantButton(group) {
    let btn = document.createElement('button');
    btn.classRegistrant = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
      group.registrants.push(new Registrant(getValue(`registrant-input-${group.id}`), getValue(`age-input-${group.id}`)));
      drawDOM();
    };
    return btn;
  }
  
  function createGroupTable(group) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let registrantColumn = document.createElement('th');
    let ageColumn = document.createElement('th');
    registrantColumn.innerHTML = 'Registrant';
    ageColumn.innerHTML = 'Age Group';
    row.appendChild(registrantColumn);
    row.appendChild(ageColumn);
    let formRow = table.insertRow(1);
    let registrantTh = document.createElement('th');
    let ageTh = document.createElement('th');
    let createTh = document.createElement('th');
    let registrantInput = document.createElement('input');
    registrantInput.setAttribute('id', `registrant-input-${group.id}`);
    registrantInput.setAttribute('type', 'text');
    registrantInput.setAttribute('class', 'form-control');
    let ageInput = document.createElement('input');
    ageInput.setAttribute('id', `age-input-${group.id}`);
    ageInput.setAttribute('type', 'text');
    ageInput.setAttribute('class', 'form-control');
    let newRegistrantButton = createNewRegistrantButton(group);
    registrantTh.appendChild(registrantInput);
    ageTh.appendChild(ageInput);
    createTh.appendChild(newRegistrantButton);
    formRow.appendChild(registrantTh);
    formRow.appendChild(ageTh);
    formRow.appendChild(createTh);
    return table
  }
  
  function clearElement(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }