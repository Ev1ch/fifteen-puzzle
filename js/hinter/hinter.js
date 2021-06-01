import { Tree } from '../tree/tree.js';
import { Node } from '../tree/node.js';

export class Hinter {
    // Приватні методи

    /**
     * Метод, що будує
     * дерево станів з
     * певною глибиною
     */
    treeBuild(tree, currentNode, depth) {
        const children = currentNode.getChildren();

        if (depth + 1 <= 5) {
            const availableStates = this.getAvailableStates(currentNode.value);

            for (const state of availableStates) {
                if (
                    currentNode === tree.getRoot() ||
                    JSON.stringify(currentNode.getParent().getValue()) !==
                    JSON.stringify(state)
                ) {
                    tree.addNode(
                        currentNode,
                        new Node({ 
                            value: [...state], 
                            parent: currentNode 
                        }),
                    );
                    this.treeBuild(
                        tree,
                        children[children.length - 1],
                        depth + 1,
                    );
                }
            }
        } else {
            return;
        }
    }

    /**
     * Метод, який знаходить
     * шлях з найбільшим показником
     * правильності
     */
    findMostValidPath(root) {
        let paths = [];

        for (const path of root.getChildren()) {
            const pathValidity = this.findPathValidity(path);

            paths.push({
                value: path.getValue(),
                validity: pathValidity,
            });
        }

        paths.sort((a, b) => b.validity - a.validity);

        return paths[0].value;
    }

    /**
     * Служить для знаходження
     * показника правильності
     * переданого шляху
     */
    findPathValidity(path) {
        if (this.board.isSolved(path.getValue())) {
            return 1;
        }

        const possibleEndings = [];
        this.findPathValidities(path, possibleEndings);
        let maxValidity = 0;

        for (const ending of possibleEndings) {
            if (ending.validity > maxValidity) {
                maxValidity = ending.validity;
            }
        }

        return maxValidity;
    }

    /**
     * Служить для знаходження
     * показників правильності
     * всіх кінцівок
     * переданого шляху
     */
    findPathValidities(currentNode, possibleEndings) {
        if (this.board.isSolved(currentNode.getValue())) {
            return possibleEndings.push({
                value: currentNode.getValue(),
                validity: this.board.getValidity(currentNode.getValue()),
            });
        }

        for (const child of currentNode.getChildren()) {
            if (child.getChildren().length === 0) {
                const value = child.getValue();
                const validity = this.board.getValidity(child.getValue());

                possibleEndings.push({
                    value,
                    validity,
                });
            } else {
                this.findPathValidities(child, possibleEndings);
            }
        }
    }

    /**
     * Повертає масив
     * доступних станів
     * з переданого стану
     */
    getAvailableStates(state) {
        const availableStates = [];
        const emptyCellIndex = state.indexOf(16);

        let newState;
        if (this.board.canMove(null, 'up', state)) {
            newState = [...state];
            newState[emptyCellIndex] = newState[emptyCellIndex + 4];
            newState[emptyCellIndex + 4] = 16;
            availableStates.push(newState);
        }
        if (this.board.canMove(null, 'down', state)) {
            newState = [...state];
            newState[emptyCellIndex] = newState[emptyCellIndex - 4];
            newState[emptyCellIndex - 4] = 16;
            availableStates.push(newState);
        }
        if (this.board.canMove(null, 'left', state)) {
            newState = [...state];
            newState[emptyCellIndex] = newState[emptyCellIndex + 1];
            newState[emptyCellIndex + 1] = 16;
            availableStates.push(newState);
        }
        if (this.board.canMove(null, 'right', state)) {
            newState = [...state];
            newState[emptyCellIndex] = newState[emptyCellIndex - 1];
            newState[emptyCellIndex - 1] = 16;
            availableStates.push(newState);
        }

        return availableStates;
    }

    
    // Інтерфейс
    constructor(boardModel) {
        this.board = boardModel;
    }

    /**
     * Повертає стан
     * після оптимального
     * ходу з переданого стану
     */
    hint(state = this.board.getState()) {
        const tree = new Tree({
            root: [...state],
        });

        const root = tree.getRoot();

        this.treeBuild(tree, root, 1);

        return this.findMostValidPath(root);
    }
}
