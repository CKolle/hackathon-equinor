class BuilderService {
    constructor(grid, playerSystem){
        this.selectedType = null;
        this.grid = grid;
        this.playerSystem = playerSystem;
    }
    attemptBuild(position){
        if(this.selectedType){
            let buildCost = config["cells"][this.selectedType].buildCost;
            if(this.playerSystem.funds >= buildCost){
                this.grid.update(this.selectedType, position.x, position.y);
                this.playerSystem.funds -= buildCost;
            }
            this.selectedType = null;
        }
    }
}

export { BuilderService };