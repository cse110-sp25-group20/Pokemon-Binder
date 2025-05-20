const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            width: 800px;
            height: 600px;
            border: 2px solid #333;
            background: #f9f9f9;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .binder {
            display: flex;
            width: 100%;
            height: 100%;
        }
        .page {
            flex: 1;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: 10px;
        }
        .page-number {
            font-size: 14px;
            text-align: center;
            margin-bottom: 10px;
        }
        .cards-container {
            flex: 1;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, auto);
            gap: 10px;
        }
        .card-slot {
            width: 100%;
            background: #eaeaea;
            border: 1px dashed #bbb;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1 / 1.4;
        }
        .card-slot img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
        }
    </style>
    <div class="binder">
        <div class="page">
            <div class="page-number"></div>
            <div class="cards-container"></div>
        </div>
        <div class="page">
            <div class="page-number"></div>
            <div class="cards-container"></div>
        </div>
    </div>
`;

class PokemonBinder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        /**
         * pagesData: array where each entry is an array of 9 image URLs (strings)
         */
        this.pagesData = [];
        this.currentIndex = 0;
        this._renderPages();
    }

    /**
     * Public method to set the pages data and reset to the start.
     * @param {Array<Array<string>>} pages Array of pages, each an array of 9 image paths.
     */
    setPages(pages) {
        if (!Array.isArray(pages)) return;
        this.pagesData = pages;
        this.currentIndex = 0;
        this._renderPages();
    }

    /**
     * Renders the two visible pages based on currentIndex.
     */
    _renderPages() {
        const pageEls = this.shadowRoot.querySelectorAll('.page');
        // Left page
        this._loadPage(pageEls[0], this.pagesData[this.currentIndex], this.currentIndex + 1);
        // Right page
        this._loadPage(pageEls[1], this.pagesData[this.currentIndex + 1], this.currentIndex + 2);
    }

    /**
     * Helper to populate a .page element with up to 9 cards and set its page number.
     * @param {HTMLElement} pageEl The page container element.
     * @param {Array<string>} cardUrls Array of up to 9 image URLs.
     * @param {number} pageNumber 1-based page number to display.
     */
    _loadPage(pageEl, cardUrls, pageNumber) {
        const numberEl = pageEl.querySelector('.page-number');
        numberEl.textContent = `Page ${pageNumber}`;
        const container = pageEl.querySelector('.cards-container');
        container.innerHTML = '';
        const urls = Array.isArray(cardUrls) ? cardUrls : [];
        for (let i = 0; i < 9; i++) {
            const slot = document.createElement('div');
            slot.classList.add('card-slot');
            const url = urls[i];
            if (url) {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Pokemon card';
                slot.appendChild(img);
            }
            container.appendChild(slot);
        }
    }

    /**
     * Advances forward by two pages, rendering empty slots if data is missing.
     */
    flipForward() {
        this.currentIndex += 2;
        this._renderPages();
    }

    /**
     * Moves backward by two pages if not already at the start.
     */
    flipBackward() {
        if (this.currentIndex - 2 >= 0) {
            this.currentIndex -= 2;
            this._renderPages();
        }
    }
}

customElements.define('pokemon-binder', PokemonBinder);
