/**
 * @jest-environment jsdom
 */

import '../pokemon-binder.js';

describe('Unit tests', () => {

    let binder;

    beforeAll(async () => {
        document.body.innerHTML = `
        <button id="addCard">addCard()</button>;
        `
        binder = await document.createElement('pokemon-binder');
        await document.body.appendChild(binder);
    });

    it('Test add card function', async () => {
        await binder.setPages([['card_back.png','','','','','','','','']]);
        const pagesData = await binder.pagesData;
        
        const expectedPage = [['card_back.png','','','','','','','','']];
        expect(pagesData).toBe(expectedPage);
        expect(binder.currentIndex).toBe(0);
    });
});