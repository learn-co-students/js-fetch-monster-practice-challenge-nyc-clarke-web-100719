

// Global Variables
let page = 1;

function appendForm() {
    const divIdCreateMonster = document.getElementById('create-monster');

    const form = document.createElement("form");
    const inputName = document.createElement("input");
    const inputAge = document.createElement("input");
    const inputDescription = document.createElement("input");
    const buttonCreate = document.createElement("button");

    form.id = "monster-form";
    inputName.id = "name";
    inputAge.id = "age";
    inputDescription.id = "description";
    buttonCreate.innerHTML = "Create";

    inputName.placeholder = "name...";
    inputAge.placeholder = "age...";
    inputDescription.placeholder = "description...";

    inputName.name = "objMonster[name]";
    inputAge.name = "objMonster[age]";
    inputDescription.name = "objMonster[description]";

    form.onsubmit = "objMonster";

    form.appendChild(inputName);
    form.appendChild(inputAge);
    form.appendChild(inputDescription);
    form.appendChild(buttonCreate);

    divIdCreateMonster.appendChild(form);
}

function fetchMonsters(intPageNum) {
    const divIdMonsterContainer = document.getElementById('monster-container');

    fetch(`http://localhost:3000/monsters?_page=${intPageNum}&_limit=50`)
        .then(data => data.json())
        .then((data) => {
            divIdMonsterContainer.innerHTML = ' ';
            renderMonsters(data);
        }).catch(console.error);
}

function renderMonsters(arrObjMonsters) {
    const divIdMonsterContainer = document.getElementById('monster-container');

    arrObjMonsters.forEach((objMonster) => {
        const divMonster = document.createElement("div");
        const h2Name = document.createElement("h2");
        const h4Age = document.createElement("h4");
        const pBio = document.createElement("p");

        h2Name.innerHTML = objMonster.name;
        h4Age.innerHTML = objMonster.age;
        pBio.innerHTML = objMonster.description;

        divMonster.appendChild(h2Name);
        divMonster.appendChild(h4Age);
        divMonster.appendChild(pBio);

        divIdMonsterContainer.appendChild(divMonster);
    });

}

function createMonster(objMonster) {

    let formData = {
        name: objMonster.name,
        age: objMonster.age,
        description: objMonster.description
    };

    let config = {
        method: "POST",
        headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        body: JSON.stringify(formData)
    };


    fetch('http://localhost:3000/monsters', config)
        .then(data => data.json())
        .then(console.log)
        .catch(console.error);
}

const init = () => {
    appendForm();
    fetchMonsters(page);

    //    Event Listeners      //

    eventListenerBtnForwardPage();
    eventListenerBtnBackwardPage();
    eventListenerFormSubmitMonster();
};

document.addEventListener("DOMContentLoaded", init);

// EVENT LISTENERS -----------------------------------------------------------------------------------------------------

// Pagination Controls

function eventListenerBtnForwardPage() {
    const btnIdForward = document.getElementById('forward');

    btnIdForward.addEventListener("click", () => {
        ++page;
        fetchMonsters(page);
    });
}

function eventListenerBtnBackwardPage() {
    const btnIdBackward = document.getElementById('back');

    btnIdBackward.addEventListener("click", () => {
        if(page > 1) {
            --page;
            fetchMonsters(page);
        }
    });
}

// Form Submission

function eventListenerFormSubmitMonster() {
    const formIdMonster = document.getElementById("monster-form");

    formIdMonster.addEventListener("submit", (event) => {
        event.preventDefault();

         const objMonster = {
          name: event.target.name.value,
          age: event.target.age.value,
            description: event.target.description.value
        };

        // alert(JSON.stringify(objMonster));

        createMonster(objMonster);
        formIdMonster.reset();
    });

}

