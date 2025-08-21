const whoEnemy = 0;
const myDamage = 20;
const zone = ['head', 'neck', 'body', 'belly', 'legs'];

const enemies = [{
  enemyName: 'Spacemarine', 
  enemyHealth: 120, 
  enemyMaxH: 120, 
  enemyAvatar: 'Spacemarine.png',
  damage: 20,
  crit: 25,
  countAttack: 1,
  countDefence: 2
}, {
  enemyName: 'Snow troll', 
  enemyHealth: 150, 
  enemyMaxH: 150, 
  enemyAvatar: 'SnowTroll.png',
  damage: 20,
  crit: 25,
  countAttack: 1,
  countDefence: 1
}, {
  enemyName: 'Spider', 
  enemyHealth: 100, 
  enemyMaxH: 100, 
  enemyAvatar: 'spider_100.png',
  damage: 20,
  crit: 25,
  countAttack: 2,
  countDefence: 2
}];

function newEnemy(e) {
  let result;
  switch (e){
    case '0': 
      result = 1;
      break;
    case '1':
      result = 2;
      break;
    case '2':
      result = 0;
      break;
    default: 
      result = e;
  }
  return result;
}

function editNameInput(name) {
  return `<input class="save-edit-name" id="saveNameInput" type="text" value="${name}"><button id="saveNameButton" type="button">Save</button>`;
}

function checkUncheckInput (selector, callback){
  let arr = [];
  selector.forEach((val, ind)=>{
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

function botAttack(whichEnemy, whoEnemy, whichZone) {
  let a = [];

  for (let i = 0; i < whichZone.length; i++) {
    if (a.length < whichEnemy[whoEnemy].countAttack)
      a.push(whichZone[Math.floor(Math.random() * whichZone.length)]);
    if (whichEnemy[whoEnemy].countAttack > 1) {
      if (a[0] === a[1]) {
        a[1] = whichZone[Math.floor(Math.random() * whichZone.length)];
      } 
    }
  }

  return a;
}

function botDefence(whichEnemy, whoEnemy, whichZone) {
  let d = [];

  for (let i = 0; i < whichZone.length; i++) {
    if (d.length < whichEnemy[whoEnemy].countDefence)
      d.push(whichZone[Math.floor(Math.random() * whichZone.length)]);
    if (whichEnemy[whoEnemy].countDefence > 1) {
      if (d[0] === d[1]) {
        d[1] = whichZone[Math.floor(Math.random() * whichZone.length)];
      } 
    }
  }

  return d;
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
const endGamePopup = document.getElementById('endGamePopup');
const closeEndGamePopup = document.getElementById('closeEndGamePopup');
const endGameMsg = document.getElementById('endGameMsg');

const inputs = document.querySelectorAll('input[type=radio]');

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
  localStorage.setItem('list', '');
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
let list = localStorage.getItem('list');

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
            b.push(v.getAttribute('value'));
          } else if (v.hasAttribute('checked') && v.classList.contains('defence')) {
            c.push(v.getAttribute('value'))
          }
        })
        if (b.length === 1 && c.length === 2) {
          attack.removeAttribute('disabled');
          attack.addEventListener('click', () => {
          let e = botAttack(enemies, enemy, zone);
          let w = botDefence(enemies, enemy, zone);
          list = list.split(',');
          let chance = Math.floor(Math.random() * 4);

          for (let i = 0; i < e.length; i++) {
            if (c.includes(e[i])) {
              list.unshift(`<p class="log-line"><span>${enemies[enemy].enemyName.toUpperCase()}</span> attacked <span>${userName.toUpperCase()}</span> to <span>${e[i].toUpperCase()}</span> but ${userName} was able to protect his ${e[i]}.</p>`);
            } else if (chance === 1) {
                list.unshift(`<p class="log-line"><span>${enemies[enemy].enemyName.toUpperCase()}</span> attacked <span>${userName.toUpperCase()}</span> to <span>${e[i].toUpperCase()}</span>. ${userName} tried to block but ${enemies[enemy].enemyName} was very lucky and crit his oppenent for <span class="crit">${enemies[enemy].crit} damage</span>.</p>`);
                let newMyHealth = myHealth - enemies[enemy].crit;
                localStorage.setItem('myHealth', newMyHealth);
              } else if (chance === 0) {
                list.unshift(`<p class="log-line"><span>${enemies[enemy].enemyName.toUpperCase()}</span> attacked <span>${userName.toUpperCase()}</span> to <span>${e[i].toUpperCase()}</span> and crit <span class="crit">${enemies[enemy].crit} damage</span>.</p>`);
                let newMyHealth = myHealth - enemies[enemy].crit;
                localStorage.setItem('myHealth', newMyHealth);
              } else {
              list.unshift(`<p class="log-line"><span>${enemies[enemy].enemyName.toUpperCase()}</span> attacked <span>${userName.toUpperCase()}</span> to <span>${e[i].toUpperCase()}</span> and deal <span class="damage">${enemies[enemy].damage} damage</span>.</p>`);
              let newMyHealth = myHealth - enemies[enemy].damage;
              localStorage.setItem('myHealth', newMyHealth);
                if (!c.includes(e[i-1]) && i > 0) {
                  let newMyHealth2 = newMyHealth - enemies[enemy].damage;
                  localStorage.setItem('myHealth', newMyHealth2);
                }
            }
          }

          if (w.includes(b[0])) {
            list.unshift(`<p class="log-line"><span>${userName.toUpperCase()}</span> attacked <span>${enemies[enemy].enemyName.toUpperCase()}</span> to <span>${b[0].toUpperCase()}</span> but ${enemies[enemy].enemyName} was able to protect his ${b[0]}.</p>`);
          } else {
            list.unshift(`<p class="log-line"><span>${userName.toUpperCase()}</span> attacked <span>${enemies[enemy].enemyName.toUpperCase()}</span> to <span>${b[0].toUpperCase()}</span> and deal <span class="damage">${myDamage} damage</span>.</p>`);
            let newEnemyHealth = enemyHealth - myDamage;
            localStorage.setItem('enemyHealth', newEnemyHealth);
          }

          localStorage.setItem('list', list.join(' '));
          location.reload();
        });
        } else {
          if(!attack.hasAttribute('disabled'))
            attack.setAttribute('disabled', '');      
      }
      });
      let nE = newEnemy(enemy);
      let winCount = Number(wins);
      let loseCount = Number(loses);
      if (myHealth < 1 && enemyHealth < 1) {
        endGamePopup.setAttribute('style', 'display: flex;');
        endGameMsg.innerHTML = 'No one won. Good luck next time!';
        closeEndGamePopup.addEventListener('click', () => {
          if (endGamePopup.hasAttribute('style'))
            endGamePopup.removeAttribute('style');

          localStorage.setItem('currentPage', 'character');
          localStorage.setItem('myHealth', 150);
          localStorage.setItem('enemy', nE);
          localStorage.setItem('enemyHealth', enemies[nE].enemyHealth);
          localStorage.setItem('list', '');
          location.reload();
        });
      } else if (myHealth < 1) {
        loseCount = loseCount + 1;
        localStorage.setItem('loses', loseCount);
        endGamePopup.setAttribute('style', 'display: flex;');
        endGameMsg.innerHTML = 'Maybe next time :(';

        closeEndGamePopup.addEventListener('click', () => {
          if (endGamePopup.hasAttribute('style'))
            endGamePopup.removeAttribute('style');

          localStorage.setItem('currentPage', 'character');
          localStorage.setItem('myHealth', 150);
          localStorage.setItem('enemy', nE);
          localStorage.setItem('enemyHealth', enemies[nE].enemyHealth);
          localStorage.setItem('list', '');
          location.reload();
        });
      } else if (enemyHealth < 1) {
        winCount = winCount + 1;
        localStorage.setItem('wins', winCount);
        endGamePopup.setAttribute('style', 'display: flex;');
        endGameMsg.innerHTML = 'Congratulations with your win!';

        closeEndGamePopup.addEventListener('click', () => {
          if (endGamePopup.hasAttribute('style'))
            endGamePopup.removeAttribute('style');

          localStorage.setItem('currentPage', 'character');
          localStorage.setItem('myHealth', 150);
          localStorage.setItem('enemy', nE);
          localStorage.setItem('enemyHealth', enemies[nE].enemyHealth);
          localStorage.setItem('list', '');
          location.reload();
        });
      }
      battlefield.innerHTML = list;
      break;
    default:
        pages.map((value)=>{value.classList.remove('visible-page')});
        home.classList.add('visible-page');
        page.innerHTML = 'Main';
  }


 }
