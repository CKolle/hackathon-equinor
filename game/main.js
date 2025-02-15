import { Renderer } from "./js/core/renderer.js";
import { Engine } from "./js/core/engine.js";

class Game {
    constructor() {
        this.renderer = new Renderer(document.getElementById("gameCanvas"));
        this.engine = new Engine(this.renderer);


    }

    start() {
        console.log("Game starting...");
        this.engine.start();
    }
}

window.addEventListener("load", () => {
    this.start();
});