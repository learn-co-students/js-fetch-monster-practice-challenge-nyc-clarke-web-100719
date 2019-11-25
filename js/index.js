const monsterURL = "http://localhost:3000/monsters"
const createMonsterDiv = document.querySelector('#create-monster');
const monstersContainer = document.querySelector('#monster-container');
const fwdButton = document.querySelector('#forward');
const backButton = document.querySelector('#back');
const pageCount = document.querySelector('#page-num')

let page = 1;

function createMonsterForm() {
    const formHTML = `
        <form id="monster-form">
            <input id="name" placeholder="name...">
            <input id="age" placeholder="age...">
            <input id="description" placeholder="description...">
            <button id="submit">Create</button>
        </form>
    `
    createMonsterDiv.insertAdjacentHTML('beforeend', formHTML);
}



function fetchMonsters(pageNumber) {
    fetch(monsterURL+`?_limit=50&_page=${pageNumber}`)
        .then(resp => resp.json())
        .then(function(data) {
            if (data.length === 0) {
                throw Error("No more monsters!")
            } else {
                monstersContainer.innerHTML = "";
                data.forEach(renderMonster);     
            }
         })
         .catch(function(error) {
             alert(error)
             fwdButton.disabled = true;
             page--;
             debugger;
             setNum();
         })
    setNum();
}

function submitListener() {
    const submitButton = document.querySelector('#submit')
    submitButton.addEventListener('click', function(e){
        e.preventDefault();
        if (getForm().name.length === 0) {
            alert("There must be a name!")
        } else if (!Number.isInteger(parseInt(getForm().age))) {
            alert("Age must be number!")
        } else {
            createMonster(getForm());
            const monsterForm = document.querySelector('#monster-form')
            monsterForm.reset();    
        }
    });
}

function getForm() {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const description = document.getElementById('description').value;
    return {
        name: name,
        age: age,
        description: description
    }
}

function createMonster(monsterObj){
    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monsterObj)
    }
    fetch(monsterURL, configObj)
        .then(resp => resp.json())
        .then(function(data) {
            console.log('new monster', data);
        })
        .catch(error => alert(error.message))
}

function renderMonster(monster) {
    const monsterHTML = `
    <div>
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
    </div>
    `
    monstersContainer.insertAdjacentHTML('beforeend', monsterHTML)
}

function fwdBackListener() {
    backButton.addEventListener('click', function() { pageDown() });
    backButton.disabled = true;
    fwdButton.addEventListener('click', function() { pageUp() });
}

function pageDown() {
    page--;
    if (page <= 1) {
        backButton.disabled = true;
    }
    fetchMonsters(page);
    if (fwdButton.disabled) {
        fwdButton.disabled = false
    }
}

function pageUp() {
    page++;
    if (page > 1) {
        backButton.disabled = false;
    }
    fetchMonsters(page);
}

function setNum() {
    pageCount.innerText = page;
}

createMonsterForm();
fetchMonsters(1);
fwdBackListener()
submitListener();