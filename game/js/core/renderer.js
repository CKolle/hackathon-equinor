import {Viewport} from "./viewport.js";
import {Vector} from "../utils/vector.js";
import {TilesetManager} from "./tilsetManager.js";
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;

        // Get the device pixel ratio
        this.pixelRatio = window.devicePixelRatio || 1;

        // Set the canvas size in display pixels
        const displayWidth = window.innerWidth - 10;
        const displayHeight = window.innerHeight - 10;

        this.canvas.width = displayWidth * this.pixelRatio;
        this.canvas.height = displayHeight * this.pixelRatio;

        this.canvas.style.width = `${displayWidth}px`;
        this.canvas.style.height = `${displayHeight}px`;

        this.viewport = new Viewport(displayWidth, displayHeight);
        this.ctx = canvas.getContext("2d", {
            alpha: false,
            antialias: false
        });

        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.imageSmoothingEnabled = false;

        this.GRID_COLOR = '#fff';
        this.GRID_LINE_WIDTH = 2;
        this.tilesetManager = new TilesetManager();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize(width, height) {
        this.ctx.save();

        const displayWidth = width;
        const displayHeight = height;

        this.canvas.width = displayWidth * this.pixelRatio;
        this.canvas.height = displayHeight * this.pixelRatio;

        this.canvas.style.width = `${displayWidth}px`;
        this.canvas.style.height = `${displayHeight}px`;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.imageSmoothingEnabled = false;

        this.viewport.displayWidth = displayWidth;
        this.viewport.displayHeight = displayHeight;

        this.ctx.restore();
    }

    render(gameState) {
        this.clear();
        this.renderTiles(gameState.grid, gameState.time);
        this.renderGrid();
        // console.log(gameState);
        this.renderGraph(gameState.timeseriesManager);
        // Buildings
        // Day night cycle
        

        // Ui
    }

    renderTiles(grid, time) {
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
                this.renderCell(cell,x,y, time);
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
    renderPanel(x,y,w,h, outlineWidth = 3) {
        // Fill the panel
        this.ctx.fillStyle = "rgba(226, 219, 213, 0.9)";
        this.ctx.fillRect(x, y, w, h);
    
        // Draw the outline
        this.ctx.lineWidth = outlineWidth;
        this.ctx.strokeStyle = "rgb(71, 51, 55)";
        this.ctx.strokeRect(x, y, w, h);
    }

    renderGraph(timeseriesManager) {
        /*
        timeseriesManager = [{
            name: "Production,
            posX: 30,
            posY: 30,
            width: 200,
            height: 100,
            data: {
                date: [1, 2, 3, 4, 5],
                values: [5, 2, 3, 2, 5]
            }
        }, ..]
        */

        // Function and constants
        function normalize(value, min, max) {
            // returns a value from 0 to 1, all values will
            // be scaled based on the timeseries (max, min) values
            return (value - min) / (max - min);
        }

        const bgPaddingX = 20;
        const bgPaddingY = 20;

        this.ctx.lineWidth = 1;
        for (let i = 0; i < timeseriesManager.timeseriesList.length; i++) {
            const timeseries = timeseriesManager.timeseriesUIList[i];
            const values = timeseriesManager.timeseriesList[i];

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
    }

    renderCell(cell, x,y, time) {
        const screenPos = this.viewport.gridToScreen(new Vector(x, y));
        const sourceRect = this.tilesetManager.getTileSourceRect(cell, x, y, time);

        // Use the cell size from viewport for rendered size
        const cellSize = this.viewport.getCellSize();
        this.ctx.drawImage(
            this.tilesetManager.tileset,
            sourceRect.x,
            sourceRect.y,
            sourceRect.width,
            sourceRect.height,
            screenPos.x,
            screenPos.y,
            cellSize,
            cellSize
        );
    }

}



export { Renderer };