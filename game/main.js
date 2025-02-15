import { Renderer } from "./js/core/renderer.js";
import { Engine } from "./js/core/engine.js";
import { Grid } from "./js/core/grid.js";
import { cells } from "./js/core/cell.js";
import { Viewport } from "./js/core/viewport.js";
import { Vector } from "./js/utils/vector.js";
import { InputService } from "./js/core/inputService.js";

const ZOOM_AMOUNT = 1.1;

class Game {
    constructor() {
        this.grid = new Grid(20, 15);
        this.renderer = new Renderer(document.getElementById("gameCanvas"), null);
        // Scale the canvas to fit the screen
        this.renderer.canvas.width=window.innerWidth-20;
        this.renderer.canvas.height=window.innerHeight-30;
        

        this.inputService = new InputService(this.renderer.canvas);

        this.viewport = new Viewport(
            this.renderer.canvas.width,
            this.renderer.canvas.height,
        );
        this.renderer.viewport = this.viewport;

        this.inputService.onMouseMove = (mouse)=>{
            if(mouse.button==0) return;
            this.viewport.pan(mouse.dx, mouse.dy);
        }
        
        this.inputService.onScroll = (mouse)=>{
            this.viewport.zoom(ZOOM_AMOUNT, mouse.scroll < 0);
        }

        this.grid = new Grid(20, 15);
        
        this.engine = new Engine(this.renderer, this.grid);

    }

    start() {
        console.log("Game starting...");
        this.engine.start();
    }
}

const game = new Game();

window.addEventListener("load", () => {
    game.start();
    addStartupCells();
});

function addStartupCells() {
    // Adds a windmill, a cable and a city
    game.grid.update(cells.WINDMILL, 0, 0);
    game.grid.update(cells.CABLE, 1, 0);
    game.grid.update(cells.CITY, 2, 0);
}