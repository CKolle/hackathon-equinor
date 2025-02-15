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
        // console.log(gameState);
        this.renderGraph(gameState.timeseries);
        // Buildings
        // Day night cycle
        

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
                this.renderTile(cell.type, cell.tileOffset, x, y);
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

    renderGraph(timeseries) {
        /*
        timeseries = {
            name: "Production,
            posX: 30,
            posY: 30,
            width: 200,
            height: 100,
            data: {
                date: [1, 2, 3, 4, 5],
                values: [5, 2, 3, 2, 5]
            }
        }
        */

        // Function and constants
        function normalize(value, min, max) {
            // returns a value from 0 to 1, all values will
            // be scaled based on the timeseries (max, min) values
            return (value - min) / (max - min);
        }

        const bgPaddingX = 20;
        const bgPaddingY = 20;
        const values = timeseries.data.values;
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);

        // Draw background
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        this.ctx.fillRect(
            timeseries.posX - bgPaddingX,
            timeseries.posY - bgPaddingY,
            timeseries.width + bgPaddingX * 2,
            timeseries.height + bgPaddingY * 2);

        // Plot title
        this.ctx.font = `12px Arial`;
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.fillText(timeseries.name,
            timeseries.posX, //+ 0.5 * timeseries.width - ((timeseries.name.length) * 16)/2, // 16 is fontsize
            timeseries.posY - bgPaddingY/3,
            timeseries.width);
        this.ctx.fill();

        this.ctx.strokeStyle = "white";
        this.ctx.beginPath();
        for (let i = 0; i < values.length; i++) {
            const lineX = timeseries.posX + timeseries.width * normalize(i, 0, values.length-1);
            const lineY = timeseries.posY + timeseries.height * normalize(values[i], maxValue, minValue);
            this.ctx.lineTo(lineX, lineY);
        }
        this.ctx.stroke();
    }

    renderTile(tile, tileOffset, x, y) {
        const screenPos = this.viewport.gridToScreen(new Vector(x, y));
        const sourceRect = this.tilesetManager.getTileSourceRect(tile, tileOffset);

        // Use the cell size from viewport for rendered size
        const cellSize = this.viewport.getCellSize();
        const renderedWidth = cellSize * sourceRect.width;
        const renderedHeight = cellSize * sourceRect.height;

        // console.log(
        //     this.tilesetManager.tileset,
        //     sourceRect.x,
        //     sourceRect.y,
        //     sourceRect.width,
        //     sourceRect.height,
        //     screenPos.x,
        //     screenPos.y,
        //     renderedWidth,
        //     renderedHeight
        // );

        this.ctx.drawImage(
            this.tilesetManager.tileset,
            sourceRect.x,
            sourceRect.y,
            sourceRect.width,
            sourceRect.height,
            screenPos.x,
            screenPos.y,
            renderedWidth,
            renderedHeight
        );
    }


    renderSprite(sprite, x, y) {
        // TBD
    }

}



export { Renderer };