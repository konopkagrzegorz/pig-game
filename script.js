'use strict';

const dice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');
const player0CurrentScore = document.getElementById('current--0');
const player1CurrentScore = document.getElementById('current--1');
const player0section = document.querySelector('.player--0');
const player1section = document.querySelector('.player--1');

let scores;
let activePlayer;
let currentScore;
let gameLive = true;

dice.classList.add('hidden');
btnRollDice.classList.add('hidden');
btnHold.classList.add('hidden');
player0section.classList.remove('player--active');
player0Score.textContent = "?";
player1Score.textContent = "?";

const init = function() {
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    gameLive = true;
    scores = [0,0];
    activePlayer = 0;
    currentScore = 0;
    player0section.classList.add('player--active');
    player0Score.textContent = currentScore;
    player1Score.textContent = currentScore;
    btnRollDice.classList.remove('hidden');
};

const switchPlayers = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
};

btnNewGame.addEventListener('click', function() {
    init();
});

btnRollDice.addEventListener('click', function() {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    btnHold.classList.remove('hidden');
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayers();
    }
});

btnHold.addEventListener('click', function() {
    if (gameLive) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    }

    if (scores[activePlayer] >= 100) {
        gameLive = false;
        dice.classList.add('hidden');
        btnHold.classList.add('hidden');
        btnRollDice.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        switchPlayers();
    }
});