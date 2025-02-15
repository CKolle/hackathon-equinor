import { Cell } from './cell.js';

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = this.initCells();
    }

    initCells() {
        const grid = Array(this.height);
        for (let y = 0; y < this.height; y++) {
            grid[y] = Array(this.width);
            for (let x = 0; x < this.width; x++) {
                grid[y][x] = new Cell(x, y);
            }
        }
        return grid;
    }

    getCell(x, y) {
        if (this.isValidPosition(x, y)) {
            return this.cells[y][x];
        }

        return null;
    }

    getNeighbors(x, y) {
        return {
            north: this.getCell(x, y - 1),
            south: this.getCell(x, y + 1),
            east: this.getCell(x + 1, y),
            west: this.getCell(x - 1, y)
        };
    }

    findConnectedCells(x, y) {
        return this.getNeighbors(x, y);
    }

    update(type, x, y) {
        let cell = this.getCell(x, y);
        if (cell) {
            cell.setType(type);
        }
    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }


}


export { Grid };