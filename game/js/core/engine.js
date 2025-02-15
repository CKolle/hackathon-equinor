export class Engine {
    constructor(renderer, grid, timeseriesManager) {
        this.paused = true;
        this.lastUpdate = performance.now();
        this.renderer = renderer;
        this.timeseriesManager = timeseriesManager;
        this.systems = new Map();
        this.grid = grid;
    }

    addSystem(name, system) {
        this.systems.set(name, system);
    }

    update(deltaTime) {
        for (const system of this.systems) {
            system[1].update(deltaTime);
        }
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
        this.paused = false;
        this.lastUpdate = performance.now();
        this.gameLoop(performance.now());
    }

    getGameState() {
        return {
            grid: this.grid,
            time: this.lastUpdate,
            timeseriesManager: this.timeseriesManager,
            lightIntensity: this.systems.get("SimTime")?this.systems.get("SimTime").lightIntensity:0
        };
    }
}