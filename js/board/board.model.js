import { BoardCellModel } from './boardCell.model.js';

export class BoardModel {
    // Приватні методи

    /**
     * Перемішує масив стану допоки
     * його не можливо зібрати
     */
    shuffleState() {
        do {
            this.state.sort(() => Math.random() - 0.5);
        } while (!this.isSolvable());
    }

    /**
     * Сортує масив клітинок в порядку
     * зростання їхніх позицій на полі
     */
    sortCells() {
        this.cells.sort((a, b) => a.getPosition() - b.getPosition());
    }

    /**
     * Оновлює масив клітинок
     * згідно з поточним станом
     */
    updateCells() {
        for (let i = 0; i < 16; i++) {
            const cell = this.cells.find(
                (cell) => cell.index === this.state[i],
            );
            cell.move(i + 1);
        }

        this.sortCells();
    }

    /**
     * Оновлює стан згідно з індексами
     * клітин і їхніми позиціями
     */
    updateState() {
        for (let i = 0; i < 16; i++) {
            const cell = this.cells.find((cell) => cell.position === i + 1);
            this.state[i] = cell.index;
        }
    }

    /**
     * Перевіряє, чи є передана
     * перестановка тою, яка вирішується
     */
    isSolvable(state = this.state) {
        const emptyCellPosition = state.indexOf(16) + 1;
        const emptyCellRow = Math.ceil(emptyCellPosition / 4);

        if ((4 - emptyCellRow + 1) % 2 === 0) {
            if (this.getInversionsNumber(state) % 2 === 1) {
                return true;
            }
        } else if ((4 - emptyCellRow + 1) % 2 === 1) {
            if (this.getInversionsNumber(state) % 2 === 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Повертає кількість перестановок
     * у переданому стані. Служить допоміжною
     * для методу isSolvable
     */
    getInversionsNumber(state = this.state) {
        let inversionsNumber = 0;

        for (let i = 0; i < 15; i++) {
            for (let j = i + 1; j < 16; j++) {
                if (state[i] > state[j] && state[j] !== 16 && state[i] !== 16)
                    inversionsNumber++;
            }
        }

        return inversionsNumber;
    }

    /**
     * Скидує масив клітинок
     * до початкового (зібраного)
     */
    resetCells() {
        this.cells = [];

        for (let i = 1; i <= 16; i++) {
            this.cells.push(
                new BoardCellModel({
                    index: i,
                    position: i,
                }),
            );
        }
    }

    /**
     * Скидує масив-стан
     * до початкового (зібраного)
     */
    resetState() {
        this.state = [];

        for (let i = 1; i <= 16; i++) {
            this.state.push(i);
        }
    }

    
    //Інтерфейс
    constructor() {
        this.state = [];
        this.cells = [];
        this.reset();
    }

    /**
     * Повертає показник зібраності
     * переданого стану. Служить евристикою
     * для побудови побудови дерева
     * станів у підказках
     */
    getValidity(state = this.state) {
        let maxScore = 16 ** 2;
        let stateScore = maxScore;

        for (let i = 1; i <= 16; i++) {
            stateScore -= Math.abs(state[i - 1] - i);
        }

        return stateScore / maxScore;
    }

    /**
     * Один з головних методів.
     * Визначає те, чи може передана
     * клітинка рухатись у переданому
     * напрямку у переданому стані
     */
    canMove(cellIndex, direction, state = this.state) {
        const emptyCellindex = state.indexOf(16);
        const emptyCellColumn =
            (emptyCellindex + 1) % 4 === 0 ? 4 : (emptyCellindex + 1) % 4;
        let isMoveAvailable = false;

        switch (direction) {
            case 'up':
                if (state[emptyCellindex + 4]) {
                    if (cellIndex) {
                        if (cellIndex === state[emptyCellindex + 4]) {
                            isMoveAvailable = true;
                        }
                    } else {
                        isMoveAvailable = true;
                    }
                }
                break;
            case 'down':
                if (state[emptyCellindex - 4]) {
                    if (cellIndex) {
                        if (cellIndex === state[emptyCellindex - 4]) {
                            isMoveAvailable = true;
                        }
                    } else {
                        isMoveAvailable = true;
                    }
                }
                break;
            case 'left':
                if (state[emptyCellindex + 1] && emptyCellColumn !== 4) {
                    if (cellIndex) {
                        if (cellIndex === state[emptyCellindex + 1]) {
                            isMoveAvailable = true;
                        }
                    } else {
                        isMoveAvailable = true;
                    }
                }
                break;
            case 'right':
                if (state[emptyCellindex - 1] && emptyCellColumn !== 1) {
                    if (cellIndex) {
                        if (cellIndex === state[emptyCellindex - 1]) {
                            isMoveAvailable = true;
                        }
                    } else {
                        isMoveAvailable = true;
                    }
                }
                break;
        }

        return isMoveAvailable;
    }

    /**
     * Рухає передану клітинку
     * у певному напрямку або
     * рухає загалом якусь клітинку
     * у переданому напрямку
     */
    move(direction, cellIndex) {
        const emptyCell = this.cells.find((element) => element.index === 16);
        const emptyCellPosition = emptyCell.getPosition();
        let cellToMove;

        if (
            (direction === 'up' && this.canMove(null, 'up')) ||
            (cellIndex && this.canMove(cellIndex, 'up'))
        ) {
            cellToMove = this.cells.find(
                (cell) => cell.getPosition() === emptyCellPosition + 4,
            );
        } else if (
            (direction === 'down' && this.canMove(null, 'down')) ||
            (cellIndex && this.canMove(cellIndex, 'down'))
        ) {
            cellToMove = this.cells.find(
                (cell) => cell.getPosition() === emptyCellPosition - 4,
            );
        } else if (
            (direction === 'left' && this.canMove(null, 'left')) ||
            (cellIndex && this.canMove(cellIndex, 'left'))
        ) {
            cellToMove = this.cells.find(
                (cell) => cell.getPosition() === emptyCellPosition + 1,
            );
        } else if (
            (direction === 'right' && this.canMove(null, 'right')) ||
            (cellIndex && this.canMove(cellIndex, 'right'))
        ) {
            cellToMove = this.cells.find(
                (cell) => cell.getPosition() === emptyCellPosition - 1,
            );
        } else return false;

        emptyCell.move(cellToMove.getPosition());
        cellToMove.move(emptyCellPosition);

        this.sortCells();
        this.updateState();

        return true;
    }

    /**
     * Перевіряє, чи є
     * переданий стан зібраним
     */
    isSolved(state = this.state) {
        for (let i = 0; i < 16; i++) {
            if (state[i] !== i + 1) return false;
        }

        return true;
    }

    /**
     * Сеттер для 
     * стану дошки
     */
    setState(state) {
        this.state = [...state];
    }

    /**
     * Геттер для
     * стану дошки
     */
    getState() {
        return this.state;
    }

    /**
     * Геттер для
     * клітинок дошки
     */
    getCells() {
        return this.cells;
    }

    /**
     * Метод скидання
     * стану дошки і клітинок
     */
    reset() {
        this.resetState();
        this.resetCells();
    }

     /**
     * Метод для тасування
     * стану дошки і клітинок
     */
    shuffle() {
        this.shuffleState();
        this.updateCells();
    }
}
