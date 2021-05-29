import { BoardModel } from './board.model.js';
import { BoardView } from './board.view.js';
import { Hinter } from '../hinter/hinter.js';
import { BoardLog } from './board.log.js';

export class BoardController {
    // Приватні методи

    /**
     * Метод, який
     * відслідковує натиснення 
     * клавіш руху
     */
    keypressHandler(event) {
        const keyName = event.code;

        if (keyName ===  'KeyW' && this.model.move('up')) {
            this.log.addState(this.model.getState());
        }
        else if (keyName ===  'KeyS' && this.model.move('down')) {
            this.log.addState(this.model.getState());
        }
        else if (keyName ===  'KeyA' && this.model.move('left')) {
            this.log.addState(this.model.getState());
        }
        else if (keyName ===  'KeyD' && this.model.move('right')) {
            this.log.addState(this.model.getState());
        }
        else return;

        this.view.update(this.model.getCells());
    }

    /**
     * Відслідковувач натиснень
     * кнопки "Shuffle"
     */
    shuffleHandler(event) {
        this.model.shuffle();

        this.log.addState(this.model.getState());

        this.view.update(this.model.getCells());
    }

    /**
     * Відслідковувач натиснень
     * кнопки "Reset"
     */
    resetHandler(event) {
        this.model.reset();

        this.log.addState(this.model.getState());

        this.view.update(this.model.getCells());
    }

    /**
     * Відслідковувач натиснень
     * кнопки "Hint"
     */
    hintHandler(event) {
        if (!this.model.isSolved()) {
            const hintedState = this.hinter.hint();

            this.model.setState(hintedState);
            this.model.updateCells();

            this.log.addState(this.model.getState());

            this.view.update(this.model.getCells());
        }
    }

    /**
     * Відслідковувач натиснень
     * на клітинки
     */
    cellClickHandler(event) {
        const cellIndex = +event.currentTarget.getAttribute('data-index');

        if (this.model.move(null, cellIndex)) {
            this.log.addState(this.model.getState());
            this.view.update(this.model.getCells());
        }
    }

    /**
     * Функція, що запускає
     * відслідковувачі натиснень
     */
    initClickHandlers() {
        document
            .querySelector('.panel__shuffle')
            .addEventListener('click', this.shuffleHandler.bind(this));

        document
            .querySelector('.panel__reset')
            .addEventListener('click', this.resetHandler.bind(this));

        document
            .querySelector('.panel__hint')
            .addEventListener('click', this.hintHandler.bind(this));

        const cellsBlocks = document.querySelectorAll('.board__cell');

        for (const cellBlock of cellsBlocks) {
            cellBlock.addEventListener(
                'click',
                this.cellClickHandler.bind(this),
            );
        }
    }

    /**
     * Відслідковувач того,
     * чи є дошка зібраною і,
     * відповідно, виділє її у
     * потрібний момент
     */
    isSolvedHandler(event) {
        if (this.model.isSolved()) this.view.highlight();
        else this.view.lowerlight();
    }


    // Інтерфейс
    constructor() {
        this.root = document.querySelector('.game');
        this.model = new BoardModel();
        this.view = new BoardView();        
        this.log = new BoardLog();
        this.hinter = new Hinter(this.model);

        this.log.addState(this.model.getState());

        this.view.render(this.root, this.model.getCells());
        this.view.highlight();

        document.addEventListener('keypress', this.keypressHandler.bind(this));
        this.initClickHandlers();

        document.addEventListener('click', this.isSolvedHandler.bind(this));
        document.addEventListener('keypress', this.isSolvedHandler.bind(this));
    }
}
