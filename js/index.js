window.addEventListener("load", function(event){

    let monsterContainer = document.querySelector("#monster-container")
    let monsterForm = document.querySelector("#create-monster")
    let currentPage = 1
    let backButton = document.querySelector("#back")
    let forwardButton = document.querySelector("#forward")

    function getMonsters(){
        monsterContainer.innerHTML = ""
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
        .then(response => response.json())
        .then(function(data){
            data.forEach(function(ele){
                monsterContainer.innerHTML += `
                <h3>${ele.name}</h3>
                <h4>Age: ${ele.age}</h4>
                <p>Bio: ${ele.description}</p>`
            })
        })
    }

    function createMonsterForm(){
        monsterForm.innerHTML += `
        <form>
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button>
        </form>`
    }

    monsterForm.addEventListener("submit", function(event){
        event.preventDefault()
        let monsterName = event.target.name.value
        let monsterAge = event.target.age.value
        let monsterDescription = event.target.description.value

        fetch("http://localhost:3000/monsters", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: monsterName,
                age: monsterAge,
                description: monsterDescription
            })
        })
    })

    forwardButton.addEventListener("click", function(event){
        let divLength = monsterContainer.querySelectorAll('p').length
        if (event.target && divLength === 50){
            currentPage++
            getMonsters(currentPage)
        }
    })

    backButton.addEventListener("click", function(event){
        if (currentPage > 1) {
            currentPage--
            getMonsters(currentPage)
        }
    })

    createMonsterForm()
    getMonsters()

})

