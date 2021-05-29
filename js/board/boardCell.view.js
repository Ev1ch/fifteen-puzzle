export class BoardCellView {
    // Приватні методи

    /**
     * Оновлює відступ
     * переданої клітинки
     * відносно дошки
     */
    updateOffsets(cell) {
        const offsetY = (4 - cell.row) * 25;
        const offsetX = (cell.column - 1) * 25;

        cell.offsetX = offsetX;
        cell.offsetY = offsetY;
    }

    
    // Інтерфейс
    constructor() {}

    /**
     * Оновлює HTML блок
     * переданої клітинки
     */
    update(cell) {
        const block = document.querySelector(
            `.board__cell[data-index="${cell.index}"]`,
        );

        this.updateOffsets(cell);

        block.style.left = cell.offsetX + '%';
        block.style.bottom = cell.offsetY + '%';
    }

    /**
     * Повертає HTML
     * шаблон переданої клітинки
     */
    template(cell) {
        this.updateOffsets(cell);

        const blockTemplate = `
        <div class="board__cell" data-index="${cell.index}" style="left: ${cell.offsetX}%; bottom: ${cell.offsetY}%;">
            <span>
                ${cell.index === 16 ? '' : cell.index}
            </span>
        </div>
        `;

        return blockTemplate;
    }
}
