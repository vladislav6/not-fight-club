const whoEnemy = Math.floor(Math.random() * 3);

const enemies = [{
  enemyName: 'Spacemarine', 
  enemyHealth: 120, 
  enemyMaxH: 120, 
  enemyAvatar: 'Spacemarine.png',
  damage: 10
}, {
  enemyName: 'Snow troll', 
  enemyHealth: 150, 
  enemyMaxH: 150, 
  enemyAvatar: 'SnowTroll.png',
  damage: 10
}, {
  enemyName: 'Spider', 
  enemyHealth: 100, 
  enemyMaxH: 100, 
  enemyAvatar: 'spider_100.png',
  damage: 20
}];

function editNameInput(name) {
  return `<input class="save-edit-name" id="saveNameInput" type="text" value="${name}"><button id="saveNameButton" type="button">Save</button>`;
}

function checkUncheckInput (selector, callback){
  let arr = [];
  selector.forEach((val)=>{
    val.addEventListener('click', ()=>{
      if (val.hasAttribute('checked')) {
        val.removeAttribute('checked');
        val.checked = false;
      } else {
        val.setAttribute('checked', '');
        arr = [...selector];
      }
      callback(arr);
    });
  });
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
const myWins = document.getElementById('wins');
const myLoses = document.getElementById('loses');
const editAvatar = document.getElementById('editAvatar');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const checkImage = popup.getElementsByClassName('check-image');
let changeAvatar = [...checkImage];

const settings = document.getElementById('settings');
const playerName = document.getElementById('playerName');
const edit = document.getElementById('edit');

const battle = document.getElementById('battle');
const attack = document.getElementById('attack');
const myBattleName = document.getElementById('myBattleName');
const myBattleAvatar = document.getElementById('myBattleAvatar');
const myValueHealth = document.getElementById('myValueHealth');
const myProgressHealth = document.getElementById('myProgressHealth');

const enemyBattleName = document.getElementById('enemyBattleName');
const enemyBattleAvatar = document.getElementById('enemyBattleAvatar');
const enemyValueHealth = document.getElementById('enemyValueHealth');
const enemyProgressHealth = document.getElementById('enemyProgressHealth');
const enemyMaxHealth = document.getElementById('enemyMaxHealth');

const inputs = document.querySelectorAll('input[type=radio]');
//const attackInputs = document.querySelectorAll('.attack');
//const defenceInputs = document.querySelectorAll('.defence');

const battlefield = document.getElementById('battlefield');

const inputName = document.getElementById('inputName');
const create = document.getElementById('create');
create.addEventListener(('click'), () => {
  localStorage.setItem('name', inputName.value);
  localStorage.setItem('avatar', 'default.jpg');
  localStorage.setItem('wins', 0);
  localStorage.setItem('loses', 0);
  localStorage.setItem('myHealth', 150);
  localStorage.setItem('enemy', whoEnemy);
  localStorage.setItem('enemyHealth', enemies[whoEnemy].enemyHealth);
  localStorage.setItem('list', '[]');
  localStorage.setItem('currentPage', 'main');
  location.reload();
});

const userName = localStorage.getItem('name');
const avatar = localStorage.getItem('avatar');
const currentPage = localStorage.getItem('currentPage');
const wins = localStorage.getItem('wins');
const loses = localStorage.getItem('loses');
const myHealth = localStorage.getItem('myHealth');
const enemyHealth = localStorage.getItem('enemyHealth');
const enemy = localStorage.getItem('enemy');

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

attack.addEventListener('click', () => {
  console.log('attack')
});

  switch (currentPage){
    case 'character':
      pages.map((value)=>{value.classList.remove('visible-page')});
      character.classList.add('visible-page');
      page.innerHTML = 'Character';
      nameCharacter.innerHTML = userName;
      currentAvatar.src = `./assets/avatar/${avatar}`;
      myWins.innerHTML = wins;
      myLoses.innerHTML = loses;
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
      myValueHealth.innerHTML = myHealth;
      myProgressHealth.value = myHealth;

      enemyBattleName.innerHTML = enemies[enemy].enemyName;
      enemyBattleAvatar.src = `./assets/enemy/${enemies[enemy].enemyAvatar}`;
      enemyValueHealth.innerHTML = enemyHealth;
      enemyProgressHealth.value = enemyHealth;
      enemyMaxHealth.innerHTML = enemies[enemy].enemyMaxH;
      enemyProgressHealth.setAttribute('max', enemies[enemy].enemyMaxH);
     
      checkUncheckInput(inputs, (a)=>{
        let b = [];
        let c = [];
        a.forEach((v) => {
          if (v.hasAttribute('checked') && v.classList.contains('attack')) {
            b.push(v);
          } else if (v.hasAttribute('checked') && v.classList.contains('defence')) {
            c.push(v)
          }
        })
        if (b.length === 1 && c.length === 2) {
          attack.removeAttribute('disabled');
        } else {
          if(!attack.hasAttribute('disabled'))
            attack.setAttribute('disabled', '');
        }
      });
    
      break;
    default:
        pages.map((value)=>{value.classList.remove('visible-page')});
        home.classList.add('visible-page');
        page.innerHTML = 'Main';
  }


 }
