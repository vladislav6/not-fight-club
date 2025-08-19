const mainWrapp = document.getElementById('mainWrapp');
let arr = mainWrapp.getElementsByClassName('main-block');
let pages = [...arr];

const register = document.getElementById('register');

const header = document.getElementById('header');
const page = document.getElementById('pageName');
const barButtons = document.getElementById('barButtons');
let headerButtons = barButtons.getElementsByTagName('img');

const home = document.getElementById('home');
const fight = document.getElementById('fight');

const character = document.getElementById('character');
const nameCharacter = document.getElementById('nameCharacter');

const settings = document.getElementById('settings');
const playerName = document.getElementById('playerName');

const battle = document.getElementById('battle');
const myBattleName = document.getElementById('myBattleName');
const battlefield = document.getElementById('battlefield');

const inputName = document.getElementById('inputName');
const create = document.getElementById('create');
create.addEventListener(('click'), () => {
  localStorage.setItem('name', inputName.value);
  localStorage.setItem('avatar', 'default');
  localStorage.setItem('wins', 0);
  localStorage.setItem('loses', 0);
  localStorage.setItem('myHealth', 150);
  localStorage.setItem('enemyHealth', 120);
  localStorage.setItem('list', '[]');
  localStorage.setItem('currentPage', 'main');
  location.reload();
});

const userName = localStorage.getItem('name');
const currentPage = localStorage.getItem('currentPage');

if (!userName) {
  register.classList.add('visible-page');
} else {
  header.classList.add('visible-page');

for (let i = 0; i < headerButtons.length; i++ ){
  headerButtons[i].addEventListener('click', () => {
    localStorage.setItem('currentPage', headerButtons[i].getAttribute('alt'));
    location.reload();
  });
}

fight.addEventListener('click', () => {
  localStorage.setItem('currentPage', 'battle');
  location.reload();
});

  switch (currentPage){
    case 'character':
      pages.map((value)=>{value.classList.remove('visible-page')});
      character.classList.add('visible-page');
      page.innerHTML = 'Character';
      nameCharacter.innerHTML = userName;
      break;
    case 'settings':
      pages.map((value)=>{value.classList.remove('visible-page')});
      settings.classList.add('visible-page');
      page.innerHTML = 'Settings';
      playerName.innerHTML = userName;
      break;
    case 'battle':
      pages.map((value)=>{value.classList.remove('visible-page')});
      battle.classList.add('visible-page');
      battlefield.classList.add('visible-page');
      page.innerHTML = 'Battle';
      myBattleName.innerHTML = userName;
      break;
    default:
        pages.map((value)=>{value.classList.remove('visible-page')});
        home.classList.add('visible-page');
        page.innerHTML = 'Main';
  }




}