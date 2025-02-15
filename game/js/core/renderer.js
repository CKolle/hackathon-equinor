import {Viewport} from "./viewport.js";
import {Vector} from "../utils/vector.js";
class Renderer {
    constructor(canvas, viewport) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.viewport = viewport;
        this.GRID_COLOR = '#ccc';
        this.GRID_LINE_WIDTH = 10;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(gameState) {
        this.clear();
        this.renderGrid();
        // console.log(gameState);
        this.renderGraph(gameState.timeseries);
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
        
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        this.ctx.fillRect(
            timeseries.posX - bgPaddingX, 
            timeseries.posY - bgPaddingY, 
            timeseries.width + bgPaddingX*2, 
            timeseries.height + bgPaddingY*2);

        this.ctx.strokeStyle = "white";
        this.ctx.beginPath();
        // let lineX = timeseries.posX + timeseries.width * normalize(0, 0, values.length);
        // let lineY = timeseries.posY + timeseries.height * normalize(values[0], maxValue, minValue);
        // this.ctx.moveTo(lineX, lineY);
        
        for (let i = 0; i < values.length; i++) {
            const lineX = timeseries.posX + timeseries.width * normalize(i, 0, values.length-1);
            const lineY = timeseries.posY + timeseries.height * normalize(values[i], maxValue, minValue);
            // console.log(values[i], maxValue, minValue)

            this.ctx.lineTo(lineX, lineY);
            // console.log(x,y, timeseries.posX, normalize(i, 0, values.length), timeseries.width, timeseries.posX + timeseries.width * normalize(i, 0, values.length));
        }
        this.ctx.stroke();
    }
}



export { Renderer };