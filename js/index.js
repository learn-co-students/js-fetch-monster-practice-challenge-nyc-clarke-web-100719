// INITIALIZE FETCH FOR FIRST PAGE
let pageNumber = 1;
getMonsters()
const monsterContainer = document.querySelector("#monster-container");
// SOME VARIABLES YAY

const createMonster = document.querySelector("#monster-form");
const backButton = document.getElementById("back")
const forwardButton = document.getElementById("forward")


    forwardButton.addEventListener('click', function (event) {
        if (event.target.id === 'forward') {
            pageNumber += 1
            monsterContainer.innerHTML = ""
            getMonsters()
        }
    })

    backButton.addEventListener('click', function (event) {
        if (event.target.id === 'back') {
            pageNumber -= 1
            monsterContainer.innerHTML = ""
            getMonsters()
        }
    })

// STEP 1:
//make a fetch get request and limit the first 50 monsters to show on the first page

function getMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(response=> response.json())
        .then(function(data) {
            data.forEach(renderMonsterHTML)
        })
}

function renderMonsterHTML(monster) {
    const monsterHTML = `
        <h1> ${monster.name} </h1>
        <h3> ${monster.age} </h3>
        <p> ${monster.description} </p>
    `
    monsterContainer.innerHTML += monsterHTML
}

// STEP 2:
// CREATE A FORM FOR MONSTERS

const renderMonsterForm = 
            `<form action="/my-handling-form-page" method="post">
            <label for="name">Name:</label>
            <input type="name" id="name" name="name">
            <label for="age">Age:</label>
            <input type="age" id="age" name="age">
            <label for="description">Description:</label>
            <input type="description" id="description" name="description">
            <button id="create" type="submit">Create New Monster</button>
            </form>
            `

createMonster.innerHTML += renderMonsterForm

createMonster.addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById("name")
    let age = document.getElementById("age")
    let description = document.getElementById("description")
    console.log(name, age, description)

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json" 
            },
            body: JSON.stringify({
                name: name.value,
                age: parseFloat(age.value),
                description: description.value
            })
        }).then(response => response.json())
            .then(json => {
                createMonster.reset()
            })
})

// STEP 3need to create a NEXT PAGE function to see next 50 monsters