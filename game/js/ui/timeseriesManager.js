export class TimeseriesManager {
    constructor(name, grid, timeseriesUIList = []) {
        // posX, posY, width = 200, height = 100
        this.name = name;
        this.grid = grid;
        this.timeseriesUIList = timeseriesUIList;

        /*
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        */

        // Timeseries
        this.dates = [0];
        this.production = [];
        this.consumption = [];
        this.energyStorage = [];
        this.totalCO2Emissions = [0];
        this.sunShine = [];
        this.wind = [];
        // new Timeseries("Production", 30, 200, 100, 50),
        // new Timeseries("Consumption", 30, 200, 100, 50),
        // new Timeseries("EnergyStorage", 30, 300, 100, 50),
        // new Timeseries("TotalCO2Emissions", 30, 400, 100, 50),
        // new Timeseries("Sunshine", 30, 500, 100, 50),
        // new Timeseries("Wind", 30, 600, 100, 50),

        this.timeseriesList = [
            this.production,
            this.consumption,
            this.energyStorage,
            this.totalCO2Emissions,
            this.sunShine,
            this.wind
        ]
    }

    update(deltaTime) {
        // Preferably loaded from a .json file
        const energyOutput = {
            "City": -1,
            "Windmill": 5
        }

        // Loop through all cells.. sum up production, consumption, etc
        // console.log(this.grid);
        let productionSum = 0;
        let consumptionSum = 0;
        const cells = this.grid.cells;
        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[0].length; x++) {
                const thisCell = cells[y][x];
                if (thisCell.electricityGeneration > 0) {
                    productionSum += energyOutput[thisCell.type];
                }
                if (thisCell.electricityGeneration < 0) {
                    consumptionSum -= energyOutput[thisCell.type];
                }
            }
        }
        // console.log(productionSum);

        this.dates.push(this.dates[this.dates.length - 1] + deltaTime);
        this.production.push(productionSum + Math.random() * 2);
        this.consumption.push(consumptionSum + Math.random() * 2);
        this.energyStorage.push(Math.random());
        this.totalCO2Emissions.push(this.totalCO2Emissions[this.totalCO2Emissions.length - 1] + Math.random());
        this.sunShine.push(Math.sin(this.dates[this.dates.length - 1] / 200));
        this.wind.push(
            Math.sin(this.dates[this.dates.length - 1] / 200 
            + Math.sin(this.dates[this.dates.length - 1] / 20)));
        console.log(this.totalCO2Emissions);

        // push(this.data.values[this.data.values.length-1] + Math.random()*10-5); // testing value

        if (this.dates.length > 1000) {
            this.dates.shift();
            this.production.shift();
            this.consumption.shift();
            this.energyStorage.shift();
            this.totalCO2Emissions.shift();
            this.sunShine.shift();
            this.wind.shift();
        }
    }
}