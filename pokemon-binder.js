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
            perspective: 1000px;
        }
        .binder {
            display: flex;
            width: 100%;
            height: 100%;
        }
        .page {
            flex: 1;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, auto);
            gap: 10px;
            padding: 20px;
            box-sizing: border-box;

            position: relative;            /* ensure transform-origin works */
            transform-style: preserve-3d;  /* children maintain 3D coords */
            transition: transform 0.6s ease;
            transform-origin: left center; /* pivot along the “spine” */
        }
        .page:not(:last-child) {
            border-right: 1px solid #ccc;
        }
        .page.turn {
            transform: rotateY(-180deg);
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
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
        </div>
        <div class="page">
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
            <div class="card-slot"></div>
        </div>
    </div>
`;

class PokemonBinder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Adds an image to the specified slot index (0–17).
     * @param {number} slotIndex - Index of the slot (0 = first slot on left page, top-left).
     * @param {string} imgUrl - URL or path to the card image.
     */
    addCard(slotIndex, imgUrl) {
        const slots = this.shadowRoot.querySelectorAll('.card-slot');
        if (slotIndex < 0 || slotIndex >= slots.length) {
            console.warn('Invalid slot index', slotIndex);
            return;
        }
        const slot = slots[slotIndex];
        slot.innerHTML = `<img src="${imgUrl}" alt="Pokemon card">`;
    }

    /**
     * Simple toggle-flip of the right-hand page.
     */
    turnPage() {
        // grab the second page (index 1)
        const pages = this.shadowRoot.querySelectorAll('.page');
        const rightPage = pages[1];
        rightPage.classList.toggle('turn');
    }
}

customElements.define('pokemon-binder', PokemonBinder);
