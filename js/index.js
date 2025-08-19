function editNameInput(name) {
  return `<input class="save-edit-name" id="saveNameInput" type="text" value="${name}"><button id="saveNameButton" type="button">Save</button>`;
}

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
const currentAvatar = document.getElementById('currentAvatar');
const nameCharacter = document.getElementById('nameCharacter');
const editAvatar = document.getElementById('editAvatar');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const checkImage = popup.getElementsByClassName('check-image');
let changeAvatar = [...checkImage];

const settings = document.getElementById('settings');
const playerName = document.getElementById('playerName');
const edit = document.getElementById('edit');

const battle = document.getElementById('battle');
const myBattleName = document.getElementById('myBattleName');
const myBattleAvatar = document.getElementById('myBattleAvatar');
const battlefield = document.getElementById('battlefield');

const inputName = document.getElementById('inputName');
const create = document.getElementById('create');
create.addEventListener(('click'), () => {
  localStorage.setItem('name', inputName.value);
  localStorage.setItem('avatar', 'default.jpg');
  localStorage.setItem('wins', 0);
  localStorage.setItem('loses', 0);
  localStorage.setItem('myHealth', 150);
  localStorage.setItem('enemyHealth', 120);
  localStorage.setItem('list', '[]');
  localStorage.setItem('currentPage', 'main');
  location.reload();
});

const userName = localStorage.getItem('name');
const avatar = localStorage.getItem('avatar');
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

for (let i = 0; i < changeAvatar.length; i++ ){
  changeAvatar[i].addEventListener('click', () => {
    localStorage.setItem('avatar', changeAvatar[i].getAttribute('data-type'));
    location.reload();
  });
}

fight.addEventListener('click', () => {
  localStorage.setItem('currentPage', 'battle');
  location.reload();
});

editAvatar.addEventListener('click', () => {
  popup.setAttribute('style', 'display: block;');
});

closePopup.addEventListener('click', () => {
  if (popup.hasAttribute('style'))
    popup.removeAttribute('style');
});

edit.addEventListener('click', () => {
  playerName.innerHTML = editNameInput(userName);
  edit.setAttribute('style', 'display: none;')

const saveNameInput = document.getElementById('saveNameInput');
const saveNameButton = document.getElementById('saveNameButton');
saveNameButton.addEventListener('click', () => {
  localStorage.setItem('name', saveNameInput.value);
  location.reload();
});

});

  switch (currentPage){
    case 'character':
      pages.map((value)=>{value.classList.remove('visible-page')});
      character.classList.add('visible-page');
      page.innerHTML = 'Character';
      nameCharacter.innerHTML = userName;
      currentAvatar.src = `./assets/avatar/${avatar}`;      
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
      myBattleAvatar.src = `./assets/avatar/${avatar}`;
      break;
    default:
        pages.map((value)=>{value.classList.remove('visible-page')});
        home.classList.add('visible-page');
        page.innerHTML = 'Main';
  }




}
