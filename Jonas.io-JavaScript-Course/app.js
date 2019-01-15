/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//establish basic game variables
var scores, roundScore, activePlayer, gamePlaying;
init();
gamePlaying: true;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
      //1.generate a random number between 1 and 6
      var dice = Math.floor(Math.random() * 6) + 1;
  
      //2.display the result
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';
    
      //3. update the score if the rolled number !== 1
      if (dice !== 1) {
          //add score
          roundScore += dice;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
          //next player
          nextPlayer();
      }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
      if(gamePlaying === true || roundScore < 100) {
      //add current score to global score
      scores[activePlayer] += roundScore;
      roundScore= 0;
      //update UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
      //check if a player has won
      if (scores[activePlayer] >= 100) {
          gamePlaying = false;
          document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      } else {
        //next player
        nextPlayer();
      }
    }
});

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');    
    //examples of removing and adding a class
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');    
    document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    //make the element with a class = dice disappear with CSS
    document.querySelector('.dice').style.display = 'none';
    //read the content of the element with the id = score-0 "Getter"
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};
//access the element with the id = current for the active player and change the content to dice "Setter"
//document.querySelector('#current-' + activePlayer).textcontent = dice;
//example of adding italics: document.querySelector('#current-' + activePlayer) innerHTML = '<em>' + dice + '</em>';




