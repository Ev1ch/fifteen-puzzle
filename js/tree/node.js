export class Node {
    // Інтерфейс
    constructor(options) {
        this.value = [...options.value];
        this.parent = options.parent;
        this.children = [];
    }

    /**
     * Геттер для значення
     * поточного елемента
     */
    getValue() {
        return this.value;
    }

    /**
     * Додає дітей
     * поточному елементу
     */
    addChild(node) {
        this.children.push(node);
    }

    /**
     * Геттер для дітей
     * поточного елемента
     */
    getChildren() {
        return this.children;
    }

    /**
     * Геттер для батька
     * поточного елемента
     */
    getParent() {
        return this.parent;
    }
}
