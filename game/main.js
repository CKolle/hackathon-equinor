import { Renderer } from "./js/core/renderer.js";
import { Engine } from "./js/core/engine.js";
import { Grid } from "./js/core/grid.js";
import { cells } from "./js/core/cell.js";
import { InputService } from "./js/core/inputService.js";

class Game {
    constructor() {
        this.grid = new Grid(20, 15);
        this.renderer = new Renderer(document.getElementById("gameCanvas"));
        // Scale the canvas to fit the screen

        this.viewport = this.renderer.viewport;
        

        this.inputService = new InputService(this.renderer.canvas);


        this.inputService.onMouseMove = (mouse)=>{
            if(mouse.button==0) return;
            this.viewport.pan(mouse.dx, mouse.dy);
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