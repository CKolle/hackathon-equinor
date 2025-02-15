class ElectricitySystem {
    constructor(grid){
        this.grid = grid;
    }
    
    update(gameState, dt){
        gameState.factors["production"] = 0; // Reset live production factor
        gameState.factors["consumption"] = 0; // Reset live consumption factor
        gameState.factors["excess"] = 0; // Metric for how much electricity is in the net

        for(let x=0; x<this.grid.width; x++){
            for(let y=0; y<this.grid.height; y++){
                let cable = this.grid.getCell(x,y);
                gameState.factors["excess"] += cable.electricityLevel;
                
                if(cable.electricityGeneration){
                    if(cable.electricityGeneration.rate>0){
                        // Production
                        let rate = cable.electricityGeneration.rate;
                        let fac = Math.abs(gameState.factors[cable.electricityGeneration.environmentFactor]);
                        let produce = 0;
                        switch(cable.electricityGeneration.type){
                            case "linear": produce = rate * fac; break;
                            case "cubic": produce = rate * fac*fac*fac; break;
                            case "fuel":
                                let amount = Math.min(gameState.factors[cable.electricityGeneration.environmentFactor],rate);
                                amount = Math.max(amount, 0);
                                gameState.factors[cable.electricityGeneration.environmentFactor] -= amount;
                                produce = amount;
                                break;
                        }
                        cable.electricityLevel += produce;
                        gameState.factors["production"] += produce;
                    }else{
                        // Consumption
                        if(cable.electricityLevel > 0){
                            let consume = cable.electricityGeneration.rate; // Should probably not be constant
                            cable.electricityLevel += consume;
                            cable.electricityLevel = Math.max(0, cable.electricityLevel);
                            gameState.factors["consumption"] -= consume;
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