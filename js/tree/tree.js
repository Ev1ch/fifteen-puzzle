import { Node } from './node.js';

export class Tree {
    // Інтерфейс
    constructor(options) {
        this.root = new Node({
            value: options.root,
            parent: [],
        });
    }

    /**
     * Геттер для кореня
     * дерева
     */
    getRoot() {
        return this.root;
    }

    /**
     * Метод для 
     * додавання нового
     * переданого
     * елемента переданому 
     * кореню
     */
    addNode(root, node) {
        root.addChild(node);
    }
}
