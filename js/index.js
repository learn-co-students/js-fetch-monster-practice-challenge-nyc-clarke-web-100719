window.addEventListener("load", function(event){
    let monsterContainer = document.querySelector("#monster-container")
    let createMonster = document.querySelector("#create-monster")
    // let forward = document.querySelector("#forward")
    // let back = document.querySelector("#back")
    let currentPage = 1

    function fetchmonster(page){
        monsterContainer.innerHTML = ""
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(function(response){return response.json()})
            .then(function(data){
                data.forEach(function(ele){
                    monsterContainer.innerHTML += `<div>
                    <h2>${ele.name}</h2>
                    <h4>Age: ${ele.age}</h4>
                    <p>Bio: ${ele.description}</p>
                    </div>`
                })
            })
    }

    createMonster.innerHTML = `<form id="monster-form">
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button id="btn">Create</button></form>`
    
    const monsterForm = document.querySelector("#monster-form")
    monsterForm.addEventListener("click", function(event){
        event.preventDefault()
        if(event.target.localName === "button"){
            const inputs = monsterForm.querySelectorAll('input')
            fetch("http://localhost:3000/monsters", {
                method: 'POST',
                headers: {"Content-Type": "application/json", Accept: "application/json"},
                body: JSON.stringify({
                    name:inputs[0].value,
                    age:parseFloat(inputs[1].value),
                    description:inputs[2].value
                })
            })
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                alert("Success.  A new monster was created")
            })
            .catch(function(error){
                alert("Error!  Something went wrong")
            })
        }
    })

    document.addEventListener("click", function(event){
        if(event.target.id === "forward" && monsterContainer.querySelectorAll('div').length === 50){
            currentPage++
            fetchmonster(currentPage)
        } else if (event.target.id === "back" && currentPage > 1) {
            currentPage--
            fetchmonster(currentPage)
        }
    })

    fetchmonster(currentPage)
})