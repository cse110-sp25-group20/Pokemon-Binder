/**
 * @jest-environment jsdom
 */

require('../pokemon-binder.js');
require('../binder.js');

describe('Unit tests', () => {

    let binder;

    beforeAll(async () => {
        document.body.innerHTML = `
        <button id="addCard">addCard()</button>;
        `
        binder = document.createElement('pokemon-binder');
        document.body.appendChild(binder);
    });

    it('Test add card function', async () => {
        const button = document.getElementById('addCard');
        button.click();
        
        const expectedPage = [['card_back.png','','','','','','','','']];
        expect(binder.pagesData).toEqual(expectedPage);
        expect(binder.currentIndex).toBe(0);
    });
});