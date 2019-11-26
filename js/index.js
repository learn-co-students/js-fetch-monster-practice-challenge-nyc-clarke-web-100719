const monsterContainer = document.querySelector('#monster-container')
const createMonsterForm = document.querySelector('#create-monster-form')
const nextMonstersButton = document.querySelector('#forward')
const lastMonstersButton = document.querySelector('#back')
let page = 1

//When the page loads, show the first 50 monsters
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(monster => {
        renderMonsters(monster)
    });
  })
  .catch(err => console.log(err.message))

//function to load monsters
  function renderMonsters(monster) {
    let monsterHTML = `
        <div class="monsterCard">
        <h1>${monster.name}</h1><button id=${monster.id}>Delete Monster</button>
        <h3>${monster.age}</h3>
        <p>${monster.description}</p>
        </div>
    `

    monsterContainer.insertAdjacentHTML('beforeend', monsterHTML)
  };

//Post request to server for new monster
createMonsterForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let formData = event.target.children
    let sendData = {}
    Array.from(formData).forEach(function (input) {
        if (input.value) {
        sendData[input.name] = input.value
        }
      }); 
    delete sendData.createmonster;
    if (!!Object.values(sendData)[0]) {
     fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(sendData),      
      })
        .then(response => response.json())
        .then(data => {
            console.log(data)    
        })
    }
});

//Next and back event listeners for monsters
nextMonstersButton.addEventListener('click', function(event) {
    page += 1
    monsterContainer.innerHTML =""
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(data => {
        data.forEach(monster => {
            renderMonsters(monster)
        });
        })
        .catch(err => console.log(err.message))
});

lastMonstersButton.addEventListener('click', function(event) {
    if (page >= 1) {
        alert("You cannot go back")
        event.preventDefault()
    } else {
        page -= 1
        monsterContainer.innerHTML =""
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(response => response.json())
            .then(data => {
            data.forEach(monster => {
                renderMonsters(monster)
            });
            })
            .catch(err => console.log(err.message))
    }
});

//Delete monster
monsterContainer.addEventListener('click', function(event) {
    if (event.target.innerText === "Delete Monster") {
        console.log(event.target.id)
        fetch(`http://localhost:3000/monsters/${event.target.id}`, {
            method: 'DELETE',     
        })
            .then(response => response.json())
            .then(data => {
                let monsterCard = event.target.closest('div')
                monsterCard.remove()
            })
    }
});
