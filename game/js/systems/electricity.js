class ElectricitySystem {
    constructor(grid){
        this.grid = grid;
    }
    
    update(gameState, dt){
        for(let x=0; x<this.grid.width; x++){
            for(let y=0; y<this.grid.height; y++){
                let cable = this.grid.getCell(x,y);
                
                if(cable.electricityGeneration){
                    if(cable.electricityGeneration.rate>0){
                        // Production
                        cable.electricityLevel += cable.electricityGeneration.rate;
                    }else{
                        // Consumption
                        if(cable.electricityLevel > 0){
                            cable.electricityLevel += cable.electricityGeneration.rate;
                            cable.electricityLevel = Math.max(0, cable.electricityLevel);
                        }
                    }
                }
                if(!cable.acceptsElectricity) continue;
                
                // Cables gain power from neighbors
                let neighbors = this.grid.findConnectedCells(cable.x, cable.y);
                Object.values(neighbors).forEach(neighbor => {
                    if(neighbor==null)return;
                    let donation = neighbor.electricityLevel * 0.3; // Diffusion amount
                    cable.electricityLevel += donation;
                    neighbor.electricityLevel = Math.max(0, neighbor.electricityLevel-donation);
                });

                if(cable.electricityLevel<0)
                    cable.electricityLevel = 0;
            }
        }
    }
}

export { ElectricitySystem };