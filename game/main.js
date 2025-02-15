import { Renderer } from "./js/core/renderer.js";
import { Engine } from "./js/core/engine.js";

class Game {
    constructor() {
        this.renderer = new Renderer(document.getElementById("gameCanvas"));
        // Scale the canvas to fit the screen
        this.renderer.canvas.width=window.innerWidth-20;
        this.renderer.canvas.height=window.innerHeight-30;
        this.engine = new Engine(this.renderer);


    }

    start() {
        console.log("Game starting...");
        this.engine.start();
    }
}

const game = new Game();

window.addEventListener("load", () => {
    game.start();
});
