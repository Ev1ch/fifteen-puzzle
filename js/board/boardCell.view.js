export class BoardCellView {
    // Приватні методи

    /**
     * Оновлює відступ
     * переданої клітинки
     * відносно дошки
     */
    updateOffsets(cell) {
        const offsetX = (cell.getColumn() - 1) * 25;
        const offsetY = (4 - cell.getRow()) * 25;

        cell.setOffsetX(offsetX);
        cell.setOffsetY(offsetY);
    }

    
    // Інтерфейс
    constructor() {}

    /**
     * Оновлює HTML блок
     * переданої клітинки
     */
    update(cell) {
        const block = document.querySelector(
            `.board__cell[data-index="${cell.getIndex()}"]`,
        );

        this.updateOffsets(cell);

        block.style.left = cell.getOffsetX() + '%';
        block.style.bottom = cell.getOffsetY() + '%';
    }

    /**
     * Повертає HTML
     * шаблон переданої клітинки
     */
    template(cell) {
        this.updateOffsets(cell);

        const blockTemplate = `
        <div class="board__cell" data-index="${cell.getIndex()}" style="left: ${cell.getOffsetX()}%; bottom: ${cell.getOffsetY()}%;">
            <span>
                ${cell.getIndex() === 16 ? '' : cell.getIndex()}
            </span>
        </div>
        `;

        return blockTemplate;
    }
}
