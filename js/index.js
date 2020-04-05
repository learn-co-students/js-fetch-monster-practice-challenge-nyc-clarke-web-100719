const monstersURL = "http://localhost:3000/monsters";
let monsterContainer = document.querySelector('div#monster-container');
let createMonsterContainer = document.querySelector('div#create-monster');
let buttonContainer = document.querySelector('.buttons');
let i = 1;

fetchMonsters(i);

createMonsterHTML = `
<form method="POST">
    <label for="name">Name:</label>
    <input type="text" name="" id="name">
    <label for="age">Age:</label>
    <input type="text" name="" id="age">
    <label for="description">Description:</label>
    <input type="textarea name="" id="description">
    <input id="button" type="submit" value="Create Monster">
</form>`
createMonsterContainer.insertAdjacentHTML('beforeend', createMonsterHTML);

createMonsterContainer.addEventListener('click', function(event){
    if (event.target.id === "button") {
        event.preventDefault();
        let name = document.querySelector('form input#name');
        let age = document.querySelector('form input#age');
        let description = document.querySelector('form input#description')
        let form = document.querySelector('form');
        fetch(monstersURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": name.value,
                "age": age.value,
                "description": description.value
            })
        })
        .then(function(response){
            
            return response.json();
        })
            .then(function(monster){
            renderMonster(monster);
            form.reset();
        })
    } 
});

function renderMonster(monster){
    let monsterHTML = `
        <h1>${monster.id}</h1>
        <h2>Name: ${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Description: ${monster.description}</p>
        <hr>`;
    monsterContainer.insertAdjacentHTML('beforeend', monsterHTML);
}

function fetchMonsters(i){
    fetch(monstersURL + `?_limit=50&_page=${i}`)
    .then(function(response){
        return response.json()
    })
   .then(function(monsters){
        monsters.forEach(function(monster){
            renderMonster(monster);
        })
    })
}

buttonContainer.addEventListener('click', function(event){
    if (event.target.id === "forward") {
        monsterContainer.innerHTML = "";
        fetchMonsters(i+=1);
    } else if (event.target.id === "back") {
        monsterContainer.innerHTML = "";
        fetchMonsters(i-=1);
    }
})


