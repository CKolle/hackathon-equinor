import { Renderer } from "./js/core/renderer.js";
import { Engine } from "./js/core/engine.js";

class Game {
    constructor() {
        this.renderer = new Renderer(document.getElementById("gameCanvas"));
        // Scale the canvas to fit the screen
        this.renderer.canvas.width=500;
        this.engine = new Engine(this.renderer);

        window.addEventListener("load", () => {
            this.start();
        });
    }

    start() {
        console.log("Game starting...");
        this.engine.start();
    }
}

