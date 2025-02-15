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

    update(gameState) {
        for (const system of this.systems) {
            system[1].update(gameState);
        }
    }


    gameLoop(timeStamp) {
        const deltaTime = timeStamp - this.lastUpdate;

        if (!this.paused) {
            this.update(this.getGameState(deltaTime));
        }

        this.renderer.render(this.getGameState(deltaTime));

        this.lastUpdate = timeStamp;
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    start() {
        console.log("Engine starting...");
        this.paused = false;
        this.lastUpdate = performance.now();
        this.gameLoop(performance.now());
    }

    getGameState(deltaTime) {
        return {
            dt: deltaTime,
            grid: this.grid,
            time: this.lastUpdate,
            timeseriesManager: this.timeseriesManager,
            lightIntensity: this.systems.get("SimTime")?this.systems.get("SimTime").lightIntensity:0
        };
    }
}