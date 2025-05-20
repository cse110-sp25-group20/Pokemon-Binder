import './pokemon-binder.js';

function handleAddCard() {
    const binder = document.querySelector('pokemon-binder');
    binder.addCard(0, 'card_back.png');
}

function turnPage() {
    const binder = document.querySelector('pokemon-binder');
    binder.turnPage();
}

const addButton = document.getElementById('addCard');
addButton.addEventListener('click', handleAddCard);

const turnButton = document.getElementById('turnPage');
turnButton.addEventListener('click', turnPage);
