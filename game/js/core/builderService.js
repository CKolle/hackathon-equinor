class BuilderService {
    constructor(grid){
        this.selectedType = null;
        this.grid = grid;
    }
    attemptBuild(position){
        if(this.selectedType){
            this.grid.update(this.selectedType, position.x, position.y);
            this.selectedType = null;
        }
    }
}

export { BuilderService };