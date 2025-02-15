class ElectricitySystem {
    constructor(grid){
        this.activeCells = []; // Cables
        this.grid = grid;
    }

    addTileObject(obj){
        this.activeCells.push(obj);
    }

    update(gameState, dt){
        this.activeCells.forEach(cable => {
            // Check for adjacent tiles if we can share electricity with an object
            this.grid.findConnectedactiveCells(cable.x, cable.y).forEach(neighbor => {
                if(!neighbor.acceptsElectricity) return;
                let donation = cable.electricityLevel * 0.5;
                neighbor.electricityLevel += donation;
                cable.electricityLevel -= donation;
            });
        });
    }
}