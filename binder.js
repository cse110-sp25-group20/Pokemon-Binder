import './pokemon-binder.js';

function handleAddCard() {
    const binder = document.querySelector('pokemon-binder');

    // Either use the existing pagesData or create a new one
    let pages;
    if (Array.isArray(binder.pagesData) && binder.pagesData.length > 0) {
        pages = binder.pagesData.map(page => page.slice());
    } else {
        pages = [['', '', '', '', '', '', '', '', '']];
    }

    let added = false;
    for (let page of pages) {
        for (let i = 0; i < page.length; i++) {
            if (!page[i]) {
                page[i] = 'card_back.png'; // Placeholder for the new card
                added = true;
                break;
            }
        }
        if (added) break;
    }
    if (!added) {
        // Again, card_back.png is a placeholder for the new card
        let newPage = ['card_back.png', '', '', '', '', '', '', '', ''];
        pages.push(newPage);
    }
    binder.setPages(pages);
}

function turnPageRight() {
    const binder = document.querySelector('pokemon-binder');
    binder.flipForward();
}

function turnPageLeft() {
    const binder = document.querySelector('pokemon-binder');
    binder.flipBackward();
}

const addButton = document.getElementById('addCard');
addButton.addEventListener('click', handleAddCard);

const turnRightButton = document.getElementById('turnPageRight');
turnRightButton.addEventListener('click', turnPageRight);

const turnLeftButton = document.getElementById('turnPageLeft');
turnLeftButton.addEventListener('click', turnPageLeft);
