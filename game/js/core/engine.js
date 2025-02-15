export class Engine {
    constructor(renderer) {
        this.running = false;
        this.paused = false;
        this.lastUpdate = performance.now();
        this.renderer = renderer;

    }

    update(deltaTime) {
        // Simulation logic here
    }


    gameLoop(timeStamp) {
        const deltaTime = timeStamp - this.lastUpdate;

        if (!this.paused) {
            this.update(deltaTime);
        }

        this.renderer.render(this.getGameState());

        this.lastUpdate = timeStamp;
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    start() {
        console.log("Engine starting...");
        this.running = true;
        this.lastUpdate = performance.now();
        this.gameLoop(performance.now());
    }
}