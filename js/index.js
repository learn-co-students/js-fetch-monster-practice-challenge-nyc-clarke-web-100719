const BASE_URL = "http://localhost:3000/"
const MONSTER_URL =`${BASE_URL}monsters`
const monsterContainer = document.getElementById('monster-container')
const monsterNewForm = document.getElementById('create-monster')
const pgButtons = document.querySelector('div.pg-btns')
let currentPage = 1;

// ADD form to div
monsterNewForm.innerHTML = `<form id="monster-form">
<input id="name" placeholder="name...">
<input id="age" placeholder="age...">
<input id="description" placeholder="description...">
<button>Create</button></form>`

const formMonster = monsterNewForm.querySelector('form')

formMonster.addEventListener('click', e =>{
    e.preventDefault()
    if(e.target.localName === "button"){
        const inputs = formMonster.querySelectorAll('input')
        if(formMonster.querySelector('input#name').value.length !== 0){
            fetch(MONSTER_URL,{
                method: "POST",
                headers: {"Content-Type": "application/json", Accept: "application/json"},
                body: JSON.stringify({ name: inputs[0].value, age:parseFloat(inputs[1].value), description:inputs[2].value})})
                .then(res=>{
                    return console.log('success')})
                .catch(err=>{alert("problem")})
        }
        else{
            alert("Missing Name")
        }
        //if(formMonster.querySelector('input#name'))
    }
})

function getMonster(page){
    fetch(MONSTER_URL +`/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(json =>{
            monsterContainer.innerHTML = json.map(divMonster).join(' ')
        })
}

const divMonster = function(monster){
    return `<div data-monster-id=${monster.id}>
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>
    </div>`
}

pgButtons.addEventListener('click',e =>{
    if(e.target.id === "forward" && monsterContainer.querySelectorAll('div').length === 50){
        currentPage++
        getMonster(currentPage)
    }
    else if(e.target.id === "back" && currentPage > 1){
        currentPage--
        getMonster(currentPage)
    }
})

getMonster(currentPage)

// POST http://localhost:3000/monsters
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// data:
// { name: string, age: number, description: string }