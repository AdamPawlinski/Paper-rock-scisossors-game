var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    roundElem = document.getElementById('js-roundTableElement'),
    gameWinner = document.getElementById('js-game-winner'),
    gameWinnerName = document.getElementById('js-game-winner-is'),
    welcome = document.querySelector('.welcome-board'),
    newGame = document.querySelector('.new-game'),
    winner = '';

function setGameElements() {
  switch(gameState) {
    case 'started':
        welcome.style.display = 'none';
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        roundElem.style.display = 'block';
        gameWinner.style.display = 'none';
        computerResultElem.style.visibility = 'hidden';
        playerResultElem.style.visibility = 'hidden';
      break;
    case 'ended':
        welcome.style.display = 'none';
        newGame.appendChild(newGameElem);
        newGameElem.style.display = 'block';
        newGameBtn.innerText = 'Play again';
        gameWinner.style.display = 'block';
        gameWinnerName.innerText = winner;
        pickElem.style.display = 'none';
      break;
    case 'notStarted':
    default:
        welcome.style.display = 'block';
        newGameElem.style.display = 'block';        
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        roundElem.style.display = 'none';
        gameWinner.style.display = 'none';
  }
}

setGameElements();
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
function newGame() {
  player.name = prompt('Please enter your name', 'player name');
  function start(){
    player.score = computer.score = 0;
    playerPickElem.innerText = computerPickElem.innerText = '';
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
  if (player.name) {
  start();
  } else if(confirm("Do you really don't want to tell me your name?")) {
      player.name = '';
      start();
    }
    else {
      player.name = prompt('Please enter your name', 'player name');
      start();
    }
  }

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '<span aria-hidden="true"> Win!</span>';
  var winnerIs = 'player';
    if (playerPick === computerPick) {
        winnerIs = 'none';
        playerResultElem.innerHTML = computerResultElem.innerHTML = '<span aria-hidden="true"> DRAW </span>'
        playerResultElem.style.visibility = 'visible';
        computerResultElem.style.visibility = 'visible';
    } else if ((computerPick === 'rock' &&  playerPick === 'scissors') ||
        (computerPick === 'scissors' &&  playerPick === 'paper') ||
        (computerPick === 'paper' &&  playerPick === 'rock')) {
        winnerIs = 'computer';
        computerResultElem.style.visibility = 'visible';
        playerResultElem.style.visibility = 'hidden';
    }
    else {
        playerResultElem.style.visibility = 'visible';
        computerResultElem.style.visibility = 'hidden';
    }
    if (winnerIs == 'player') {
        player.score++;
        setGamePoints();
    } else if (winnerIs == 'computer') {
        computer.score++;
        setGamePoints();
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    gameWinnerIs();
}

function gameWinnerIs() {
  if (player.score === 10) {
    winner = 'The winner is ' + player.name;
    gameState = 'ended';
    setGameElements();
  }
  else if (computer.score === 10) {
    winner = 'The winner is computer';
    gameState = 'ended';
    setGameElements();
  }
}
