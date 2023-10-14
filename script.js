'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const roll = new Audio("audio/roll.wav");
const hold = new Audio("audio/hold.wav");
const newGame = new Audio("audio/newgame.wav");
const instrClick = new Audio("audio/click.wav");
const tada = new Audio("audio/tada.wav");
const pig = new Audio("audio/pig.wav");

let scores, currentScore, activePlayer, playing, canroll;

// Starting conditions
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    canroll = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
	
	document.getElementById("youWin").style.display = "none";
};
init();

 function play() {
        var audio = document.getElementById("audio");
        audio.play();
      }

// Show or hide instructions
function showInstructions() {
  document.getElementById("instructions").style.display = "block";
  instrClick.play();
}
function hideInstructions() {
  document.getElementById("instructions").style.display = "none";
  instrClick.play();
}

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality  -- mobile functionality added
function btnRollHandler() {
    if (playing && canroll) {
        canroll = false;
        roll.play();
        // prevent user player from rolling die while animating
        diceEl.classList.add('rotate');
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${dice}.png`;

        // adding delay for animation;
        setTimeout(()=>{
    
            // 3. Check for rolled 1
            if (dice !== 1) {
                // Add dice to current score
                currentScore += dice;
                document.getElementById(`current--${activePlayer}`).textContent =
                    currentScore;
            } else {
				//play pig roll sound
				pig.play();
                // Switch to next player
                switchPlayer();				
            }
            diceEl.classList.remove('rotate');  
            canroll = true;
        },1000);
    }
}
btnRoll.addEventListener('click', btnRollHandler);
btnRoll.addEventListener('touchstart', btnRollHandler);

function btnHoldHandler() {
    if (playing) {       
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');					

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
		
			// display you win image
			document.getElementById("youWin").style.display = "block";
			tada.play();
				
        } else {
			hold.play();
            // Switch to the next player
            switchPlayer();
        }	
    }
	event.preventDefault();
}
btnHold.addEventListener('click', btnHoldHandler);
btnHold.addEventListener('touchstart', btnHoldHandler);

btnNew.addEventListener('click', ()=>{
    newGame.play();
    init();
});
btnNew.addEventListener('touchstart', ()=>{
    newGame.play();
    init();
});