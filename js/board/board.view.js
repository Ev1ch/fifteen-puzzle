import { BoardCellView } from './boardCell.view.js';

export class BoardView {
    // Приватні методи
    
    /**
     * Повертає HTML-шаблон
     * дошки
     */
    template() {
        const blockTemplate = `
            <div class="board">
            </div>
        `;

        return blockTemplate;
    }


    // Інтерфейс
    constructor() {}

    /**
     * Служить для виділення
     * дошки (зміни її фону)
     * у зібраному стані
     */
    highlight() {
        this.root.style.background = '#2f4f2f';
    }

    /**
     * Служить для зняття виділення
     * дошки (зміни її фону)
     * у розібраному стані
     */
    lowerlight() {
        this.root.style.background = '';
    }

    /**
     * Служить для рендеру
     * дошки та переданих моделей
     * клітинок у переданий root-елемент
     */
    render(root, cells) {
        root.innerHTML += this.template();

        this.root = document.querySelector('.board');
        this.cellView = new BoardCellView();

        for (const cell of cells) {
            this.root.innerHTML += this.cellView.template(cell);
        }
    }

    /**
     * Оновлює блоки клітинок
     * у структурі документа 
     * згідно з переданими моделями
     */
    update(cells) {
        for (const cell of cells) {
            this.cellView.update(cell);
        }
    }
}
