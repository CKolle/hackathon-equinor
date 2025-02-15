class ElectricitySystem {
    constructor(grid){
        this.activeCells = []; // Cables
        this.grid = grid;
    }

    addTileObject(obj){
        this.activeCells.push(obj);
    }

    update(gameState){
        // console.log(this.grid);
        for(let x=0; x<this.grid.width; x++){
            for(let y=0; y<this.grid.height; y++){
                let cable = this.grid.getCell(x,y);
                if(!cable.acceptsElectricity && cable.electricityGeneration<=0) continue;
                if(cable.electricityGeneration>0)
                // cable.electricityLevel += cable.electricityGeneration;
                    cable.electricityLevel = 1;
                if(cable.electricityLevel<0) cable.electricityLevel = 0;
                let neighbors = this.grid.findConnectedCells(cable.x, cable.y);
                Object.values(neighbors).forEach(neighbor => {
                    if(neighbor==null)return;
                    if(!neighbor.acceptsElectricity) return;
                    let donation = cable.electricityLevel * 0.1;
                    neighbor.electricityLevel += donation;
                    cable.electricityLevel = Math.max(0, cable.electricityLevel-donation);
                });
            }
        }
        // this.activeCells.forEach(cable => {
        //     // Check for adjacent tiles if we can share electricity with an object
        //     this.grid.findConnectedactiveCells(cable.x, cable.y).forEach(neighbor => {
        //         if(!neighbor.acceptsElectricity) return;
        //         let donation = cable.electricityLevel * 0.5;
        //         neighbor.electricityLevel += donation;
        //         cable.electricityLevel += cable.electricityGeneration - donation;
        //     });
        // });
    }
}

export { ElectricitySystem };