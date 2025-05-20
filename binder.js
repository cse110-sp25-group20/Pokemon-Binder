import './pokemon-binder.js';

function handleAddCard() {
    const binder = document.querySelector('pokemon-binder');
    binder.addCard(0, 'card_back.png');
}

function turnPageRight() {
    const binder = document.querySelector('pokemon-binder');
    binder.turnPageRight();
}

function turnPageLeft() {
    const binder = document.querySelector('pokemon-binder');
    binder.turnPageLeft();
}

const addButton = document.getElementById('addCard');
addButton.addEventListener('click', handleAddCard);

const turnRightButton = document.getElementById('turnPageRight');
turnRightButton.addEventListener('click', turnPageRight);

const turnLeftButton = document.getElementById('turnPageLeft');
turnLeftButton.addEventListener('click', turnPageLeft);
