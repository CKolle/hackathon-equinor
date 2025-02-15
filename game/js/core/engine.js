export class Engine {
    constructor(renderer, grid, production) {
        this.paused = true;
        this.lastUpdate = performance.now();
        this.renderer = renderer;
        this.production = production;
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
        // let c = this.timeseriesManager.timeseriesList.map(ts => ({
        //     name: ts.name,
        //     posX: ts.posX,
        //     posY: ts.posY,
        //     width: ts.width,
        //     height: ts.height,
        //     data: ts.data
        // }));
        // console.log(c);

        return {
            grid: this.grid,
            time: this.lastUpdate,
            production: this.production
            // timeseriesManager: this.timeseriesManager
            // timeseries: this.timeseriesManager.timeseriesList.map(ts => ({
            //     name: ts.name,
            //     posX: ts.posX,
            //     posY: ts.posY,
            //     width: ts.width,
            //     height: ts.height,
            //     data: ts.data
            // }))
        };
    }
}