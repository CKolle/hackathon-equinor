import { Renderer } from "./js/core/renderer.js";
import { Engine } from "./js/core/engine.js";
import { Grid } from "./js/core/grid.js";
import { cells } from "./js/core/cell.js";
import { Cell } from "./js/core/cell.js";
import { ViewportController } from "./js/core/viewportController.js";
import { Vector } from "./js/utils/vector.js";

class Game {
    constructor() {
        this.renderer = new Renderer(document.getElementById("gameCanvas"));
        // Scale the canvas to fit the screen
        this.renderer.canvas.width=window.innerWidth-20;
        this.renderer.canvas.height=window.innerHeight-30;
        
        this.viewport = new ViewportController(
            this.renderer.canvas.width,
            this.renderer.canvas.height
        );

        this.engine = new Engine(this.renderer);
        this.grid = new Grid(20, 15);
        

    }

    start() {
        console.log("Game starting...");
        console.log(game.viewport.gridToScreen(new Vector(1,1)));
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