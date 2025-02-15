import {Viewport} from "./viewport.js";
import {Vector} from "../utils/vector.js";
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width=window.innerWidth-20;
        this.canvas.height=window.innerHeight-30;
        this.viewport = new Viewport(canvas.width, canvas.height);
        this.ctx = canvas.getContext("2d");
        this.GRID_COLOR = '#fff';
        this.GRID_LINE_WIDTH = 10;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(gameState) {
        this.clear();
        this.renderGrid();
        // Buildings
        // Ui
    }

    renderGrid() {

        this.ctx.strokeStyle = this.GRID_COLOR;
        this.ctx.lineWidth = this.GRID_LINE_WIDTH / this.viewport.scale; // Scale line width

        const topLeft = this.viewport.screenToGrid(new Vector(0, 0));
        const bottomRight = this.viewport.screenToGrid(new Vector(this.canvas.width, this.canvas.height));

        const startX = Math.floor(topLeft.x - 1);
        const startY = Math.floor(topLeft.y - 1);
        const endX = Math.ceil(bottomRight.x + 1);
        const endY = Math.ceil(bottomRight.y + 1);

        for (let x = startX; x <= endX; x++) {
            const startPoint = this.viewport.gridToScreen(new Vector(x, startY));
            const endPoint = this.viewport.gridToScreen(new Vector(x, endY));
            this.ctx.beginPath();
            this.ctx.moveTo(startPoint.x, startPoint.y);
            this.ctx.lineTo(endPoint.x, endPoint.y);
            this.ctx.stroke();
        }

        for (let y = startY; y <= endY; y++) {
            const startPoint = this.viewport.gridToScreen(new Vector(startX, y));
            const endPoint = this.viewport.gridToScreen(new Vector(endX, y));

            this.ctx.beginPath();
            this.ctx.moveTo(startPoint.x, startPoint.y);
            this.ctx.lineTo(endPoint.x, endPoint.y);
            this.ctx.stroke();
        }
    }
}



export { Renderer };