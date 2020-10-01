let spanTotalUsuarios = null;
let spanEstatisticaSexoMasculino = null;
let spanEstatisticaSexoFeminino = null;
let spanSomaDasIdades = null;
let spanMediaDasIdades = null;
let divUsuarios = null;
let inputBusca = null;
let buttonBusca = null;
let allUsers = null;
let filteredUsers = null;

window.addEventListener('load',()=>{
    spanTotalUsuarios = document.querySelector('#spanTotalUsuarios');
    spanEstatisticaSexoMasculino = document.querySelector('#spanEstatisticaSexoMasculino');
    spanEstatisticaSexoFeminino = document.querySelector('#spanEstatisticaSexoFeminino');
    spanSomaDasIdades = document.querySelector('#spanSomaDasIdades');
    spanMediaDasIdades = document.querySelector('#spanMediaDasIdades');
    divUsuarios = document.querySelector('#divUsuarios');
    inputBusca = document.querySelector('#usuario');
    buttonBusca = document.querySelector('.btn');
    buttonBusca.disabled = true;
    fetchUsuario();

    inputBusca.addEventListener('keyup', (event)=>{
        if(event.target.value.length > 0){
            buttonBusca.removeAttribute('disabled');
            if(event.key==='Enter'){
                filterUser(event.target.value);
                render();
            }
        } else {
            buttonBusca.setAttribute('disabled',true);
        }
    });

    buttonBusca.addEventListener('click',()=>{
        filterUser(inputBusca.value);
        render();
    })
});

async function fetchUsuario() {
    let res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    let json =  await res.json();

    allUsers = json.results.map(user => {
        return {
            name : `${user.name.first} ${user.name.last}`,
            picture : user.picture.thumbnail,
            age : user.dob.age,
            gender : user.gender
        };
    });
}

function filterUser(word){
    filteredUsers = allUsers.filter( user => {
        if(user.name.toLowerCase().includes(word.toLowerCase()) > 0){
            return user;
        }
    });
}

function render(){
    let usersHTML = `<div>`;

    filteredUsers.forEach(user=>{
        usersHTML += `
            <div class="user">
                <img class="userImg"src="${user.picture}">
                <p class="userText">${user.name}, ${user.age} Anos</p>
            </div>
        `;
    });

    usersHTML += `</div>`;
    divUsuarios.innerHTML = usersHTML;
    countfilteredUsers();
    countfilteredUsersMale();
    countfilteredUsersFemale();
    sumOfAges();
    avarageAges();
}

function countfilteredUsers(){
    spanTotalUsuarios.textContent = filteredUsers.length;
}

function countfilteredUsersMale(){
    spanEstatisticaSexoMasculino.textContent = filteredUsers.reduce((acc,curr)=>{
        if(curr.gender === 'male') {
            ++acc;
        }
        return acc;
    },0);
}

function countfilteredUsersFemale(){
    spanEstatisticaSexoFeminino.textContent = filteredUsers.reduce((acc,curr)=>{
        if(curr.gender === 'female') {
            ++acc;
        }
        return acc;
    },0);
}

function sumOfAges(){
    spanSomaDasIdades.textContent = filteredUsers.reduce((acc,curr)=> acc + curr.age,0);
}

function avarageAges() {
     spanMediaDasIdades.textContent = parseFloat((filteredUsers.reduce((acc,curr)=> acc + curr.age,0) / filteredUsers.length).toFixed(2)) || 0;
}
