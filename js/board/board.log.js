export class BoardLog {
    // Інтерфейс
    constructor() {
        this.log = []
    }

    /**
     * Геттер для
     * логу
     */
    getState() {
        return this.log;
    }

    /**
     * Метод для 
     * додавання нових
     * станів у лог
     */
    addState(state) {
        this.log.push([...state]);
    }

    /**
     * Метод для 
     * діставання
     * n-нного елемента
     * з вершини
     */
    getFromTop(n) {
        return this.log[this.log.length - n];
    }

    /**
     * Метод для 
     * перегляду
     * логу
     */
    print() {
        console.log('Board log: ', this.log);
    }
}