/**Variable declarations */
const mURL = "http://localhost:3000/monsters";
const limit = 50; //# of entries per page
let page = 1; //#page tracker
let mContainer = document.querySelector("#monster-container");
let fContainer = document.querySelector("#create-monster");

/**Total Number of entries */
let maxNumber = -1;
fetch(mURL).then(resp=>resp.json()).then(json=> {
    maxNumber = Math.ceil(json.length/limit)
    pageNumDisplay();
});


/**Page init */
populatePage(false);
generateForm();

/**Populates page with Monster entries, taking a boolean argument
 * to force page to scroll to bottom
*/
function populatePage(navFlag){
    //Remove previous monster cards
    while (mContainer.hasChildNodes()){
        mContainer.firstChild.remove();
    }
    //fetch to create new monster cards
    fetch(`${mURL}/?_limit=${limit}&_page=${page}`)
        .then(resp=>resp.json())
        .then(json=>generateEle(json,navFlag));
}

/**Helper method for populatePage
 * Iterates through the json data and creates monster card elements
 * and will auto-scroll to the bottom of the page if navFlag is true 
*/
function generateEle(jsonArr,navFlag){
    jsonArr.forEach(function(jsonData){
        let card = document.createElement('div');
        card.setAttribute('class',"monsterCard");
        card.innerHTML = `<h3>Name : ${jsonData.name}</h3>
        <h4>Age : ${jsonData.age}</h4>
        Description : ${jsonData.description}`;

        mContainer.appendChild(card);
    });
    if(navFlag) {
        let max = getHeight();
        document.scrollingElement.scrollTo(0,max);
    }
}

/**Creates form to input new monster data */
function generateForm(){
    let form = document.createElement('form');
    form.setAttribute('class','mForm');
    form.innerHTML = `
        Name : <input type="text" id="name">
        <br>Age : <input type="text" id="age">
        <br>Description : <input type="text" id="desc">
        <br><button type="button" class="submit">Submit</button>
    `;
    fContainer.appendChild(form)
}

/**Displays to user current page number out of max pages */
function pageNumDisplay(){
    let pNum = document.getElementById("pageNumSpan");
    if (pNum){
        pNum.remove();
    }
    pNum = document.createElement("span");
    pNum.id = "pageNumSpan";
    pNum.innerText = `${page} out of ${maxNumber}`;
    document.getElementById("pageNum").appendChild(pNum);
}

/**Helper method for getting dynamic height of page 
 * used to determine height to scroll to 
 */
function getHeight(){
    let body = document.body,
    html = document.documentElement;

    return Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight,
                    html.offsetHeight );
}




/**Navigate pages based on argument (1 for forward, -1 for back)
 * Alerts user if they attempt to navigate to pages that do not exist.
 */
function pageMove(num){
    //On first page
    if (page + num < 1){
        alert("There is no such thing as page 0");
    }
    //On last page
    else if(document.querySelectorAll(".monsterCard").length < 50 && num > 0){
        alert("There are no more monsters");
    }
    //update page number and repopulate page (set to navigate to bottom of page)
    else{
        page += num;
        populatePage(true);
        pageNumDisplay();
    }
}

/**Monster form, creates a new entry in JSON database */
function createMonster(){
    let newName = document.querySelector("#name");
    let newAge= document.querySelector("#age");
    let newDesc = document.querySelector("#desc");

    if (newName.value === ""){ alert("Please Enter a Name"); }
    else if(newAge.value === "") { alert("Please Enter an Age"); }
    else if(newDesc.value === "") { alert("Please Enter a Description");}
    else{
        newAge.value = parseFloat(newAge.value);
        let monsterConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: newName.value,
                age: newAge.value,
                description: newDesc.value
            })
        }
        fetch(mURL,monsterConfig)
            .then(resp=>resp.json())
            .then(json=>{
                alert(`New Monster ${json.name} Created!`);
                if(page === maxNumber){
                    populatePage(true);
                }
            });

        newName.value = "";
        newAge.value = "";
        newDesc.value = "";

        
    }
}

/**Event delegation  */
document.addEventListener('click', (e)=>{
    if (e.target.id === "back"){
        pageMove(-1);
    }
    else if (e.target.id === "forward"){
        pageMove(1);
    }
    else if (e.target.className === "submit"){
        createMonster();
    }
});


