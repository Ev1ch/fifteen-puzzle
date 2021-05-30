export class BoardCellModel {
    // Приватні методи

    /**
     * Оновлює рядок і стовпець
     * клітинки згідно з її 
     * позицією
     */
    updateLocation() {
        this.row = Math.ceil(this.position / 4);
        this.column = this.position % 4 === 0 ? 4 : this.position % 4;
    }

    
    // Інтерфейс
    constructor(options) {
        this.index = options.index;
        this.position = options.position;
        this.updateLocation();
    }

    /**
     * Геттер для індексу
     * клітинки
     */
    getIndex() {
        return this.index;
    }

    /**
     * Геттер для позиції
     * клітинки
     */
    getPosition() {
        return this.position;
    }

    /**
     * Геттер для колонки
     * клітинки
     */
    getColumn() {
        return this.column;
    }

    /**
     * Геттер для рядка
     * клітинки
     */
    getRow() {
        return this.row;
    }

    /**
     * Сеттер для 
     * відступу по осі Х
     * клітинки
     */
     setOffsetX(offsetX) {
        this.offsetX = offsetX;
    }

    /**
     * Геттер для 
     * відступу по осі Х
     * клітинки
     */
     getOffsetX() {
        return this.offsetX;
    }

    /**
     * Сеттер для 
     * відступу по осі Y
     * клітинки
     */
     setOffsetY(offsetY) {
        this.offsetY = offsetY;
    }

    /**
     * Геттер для 
     * відступу по осі У
     * клітинки
     */
     getOffsetY() {
        return this.offsetY;
    }

    /**
     * Метод, що служить
     * для руху клітинки 
     * (оновлення її поля 
     * position та
     * рядка зі стовпцем)
     */
    move(position) {
        this.position = position;
        this.updateLocation();
    }
}
