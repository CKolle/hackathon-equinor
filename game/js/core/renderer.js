import {Viewport} from "./viewport.js";
import {Vector} from "../utils/vector.js";
import {TilesetManager} from "./tilsetManager.js";
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width=window.innerWidth-20;
        this.canvas.height=window.innerHeight-30;
        this.viewport = new Viewport(canvas.width, canvas.height);
        this.ctx = canvas.getContext("2d");
        this.GRID_COLOR = '#fff';
        this.GRID_LINE_WIDTH = 10;
        this.tilesetManager = new TilesetManager();
        this.tilesetManager.load().then(()=>{
            console.log("Tileset loaded");
        });


    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.viewport.displayWidth = width;
        this.viewport.displayHeight = height;
    }

    render(gameState) {
        this.clear();
        this.renderBuildings(gameState.grid);
        this.renderGrid();
        // Ui
    }

    renderBuildings(grid) {
        // Get visible area of the grid
        const topLeft = this.viewport.screenToGrid(new Vector(0, 0));
        const bottomRight = this.viewport.screenToGrid(new Vector(this.canvas.width, this.canvas.height));

        const startX = Math.floor(topLeft.x - 1);
        const startY = Math.floor(topLeft.y - 1);
        const endX = Math.ceil(bottomRight.x + 1);
        const endY = Math.ceil(bottomRight.y + 1);

        // Iterate through visible cells
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                const cell = grid.getCell(x, y);
                if (!cell) continue;
                this.renderTile(cell.type, x, y);
            }
        }
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

    renderTile(tile, x, y) {
        if (!this.tilesetManager.loaded || !tile) return;

        const screenPos = this.viewport.gridToScreen(new Vector(x, y));
        const tileDefinition = this.tilesetManager.getDefinition(tile);
        if (!tileDefinition) return;
        const sourceRect = this.tilesetManager.getTileSourceRect(tile);

        // Use the cell size from viewport for rendered size
        const cellSize = this.viewport.getCellSize();
        const renderedWidth = cellSize * tileDefinition.width;
        const renderedHeight = cellSize * tileDefinition.height;

        // Calculate anchor points (default to center)
        const anchorX = tileDefinition.anchor?.x || 0.5;
        const anchorY = tileDefinition.anchor?.y || 0.5;

        // Calculate draw position with anchor offset
        const drawX = screenPos.x - (renderedWidth * anchorX);
        const drawY = screenPos.y - (renderedHeight * anchorY);

        this.ctx.drawImage(
            this.tilesetManager.tileset,
            sourceRect.x,
            sourceRect.y,
            sourceRect.width,
            sourceRect.height,
            drawX,
            drawY,
            renderedWidth,
            renderedHeight
        );
    }


    renderSprite(sprite, x, y) {
        // TBD
    }

}



export { Renderer };