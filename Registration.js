class Registrant{
    constructor(registrant, age){
        this.registrant = registrant;
        this.age = age;
    }
}

class Group{
    constructor(group, registrant){
        this.group = group;
        this.registrant = registrant;
        this.registrants = [];
    }
}

function addRegistrant(Registrant){
    this.registrants.push(Registrant);
}

function deleteRegistrant(Registrant){
    let index = this.registrants.indexOf(reg);
    this.registrants.splice(index, 1);
}

let groups = [];
let groupId = 0;

function onClick(Group, action){
    let element = document.getElementById(Group);
    element.addEventListener('click', action);
    return element;
}

function getValue(Group){
    return document.getElementById(Group).value;
}

function createDeleteGroupButton(Group){
    let btn = document.createElement;
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Group';
    btn.onClick = () => {
        let index = groups.indexOf(Group);
        groups.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function drawDOM(){
    let groupDiv = document.getElementById('groups');
    clearElement(groupDiv);
    for(Group of groups){
        let table = createGroupTable(Group);
        let title = document.createElement('h2');
        title.innerHTML = Group.registrant;
        title.appendChild(createDeleteGroupButton(Group));
        groupDiv.appendChild(title);
        groupDiv.appendChild(table);
        for (Registrant of Group.registrants){
            createRegistrantRow(Group, table, Registrant);
        }
    }
}

onClick('new-group', () => {
    groups.push(new Group(groupId++, getValue('new-group-name')));
    drawDOM();
});

function createRegistrantRow(Group, table, Registrant){
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = Registrant.registrant;
    row.insertCell.innerHTML = Registrant.age;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(Group, Registrant));
}

function createDeleteRowButton(Group, Registrant){
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = Group.registrants.indexOf(Registrant);
        Group.registrants.splice(index, 1);
        drawDOM();
    };
}

function createNewRegistrantButton(Group){
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onClick = () => {
        Group.registrants.push(new Registrant(getValue('registrant-input-${group.id}'), getValue('age-input-${group.id}')));
        drawDOM();
    };
    return btn;
}

function createGroupTable(Group){
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
    registrantInput.setAttribute('group', 'registrant-input-${group.id}');
    registrantInput.setAttribute('type', 'text');
    registrantInput.setAttribute('class', 'form-control');
    let ageInput = document.createElement('input');
    ageInput.setAttribute('group', 'age-input-${group.id}');
    ageInput.setAttribute('type', 'text');
    ageInput.setAttribute('class', 'form-control'); 
    let newRegistrantButton = createNewRegistrantButton(Group);
    registrantTh.appendChild(registrantInput);
    ageTh.appendChild(ageInput);
    createTh.appendChild(newRegistrantButton);
    formRow.appendChild(registrantTh);
    formRow.appendChild(ageTh)
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}