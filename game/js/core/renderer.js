class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.CELL_SIZE = 16;
        this.GRID_COLOR = '#ccc';
        this.GRID_LINE_WIDTH = 1;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(gameState) {
        this.clear();
        this.renderGrid(gameState.grid);
        // Buildings
        // Ui
    }

    renderGrid(grid) {
        this.ctx.strokeStyle = this.GRID_COLOR;
        this.ctx.lineWidth = this.GRID_LINE_WIDTH;

        for (let x = 0; x <= grid.width; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.CELL_SIZE, 0);
            this.ctx.lineTo(x * this.CELL_SIZE, grid.height * this.CELL_SIZE);
            this.ctx.stroke();
        }

        for (let y = 0; y <= grid.height; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.CELL_SIZE);
            this.ctx.lineTo(grid.width * this.CELL_SIZE, y * this.CELL_SIZE);
            this.ctx.stroke();
        }
    }
}



export { Renderer };