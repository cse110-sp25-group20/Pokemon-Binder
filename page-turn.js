// page-turn.js
/**
 * Wire up a “Turn Page” button to your binder.
 *
 * @param {string} binderSelector CSS selector for your <pokemon-binder>
 * @param {string} buttonSelector CSS selector for the turn button
 */
export function initPageTurn(binderSelector, buttonSelector) {
    const binder = document.querySelector(binderSelector);
    const btn    = document.querySelector(buttonSelector);

    if (!binder || !btn) {
        console.error('Missing binder or turn button');
        return;
    }

    btn.addEventListener('click', () => {
        binder.turnPage();
    });
}
