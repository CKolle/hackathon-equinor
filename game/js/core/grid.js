class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = this.initCells();
    }

    initCells() {
        return Array(this.height).fill

    }

    getCell(x, y) {
        if (this.isValidPosition(x, y)) {
            return this.cells[y][x];
        }

        return null;
    }

    getNeighbors(x, y) {
        const neighbors = {
            north: this.getCell(x, y - 1),
            south: this.getCell(x, y + 1),
            east: this.getCell(x + 1, y),
            west: this.getCell(x - 1, y)
        };

        // Add diagonal neighbors if needed
        neighbors.northEast = this.getCell(x + 1, y - 1);
        neighbors.northWest = this.getCell(x - 1, y - 1);
        neighbors.southEast = this.getCell(x + 1, y + 1);
        neighbors.southWest = this.getCell(x - 1, y + 1);

        return neighbors;
    }

    findConnectedCells(x, y) {

    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }


}