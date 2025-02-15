import { cells } from "./cell.js";

class BuilderService {
    constructor(grid){
        this.selectedType = cells.WINDMILL;
        this.grid = grid;
    }
    attemptBuild(position){
        console.log(this.selectedType, position.x, position.y);
        this.grid.update(this.selectedType, position.x, position.y);
        this.selectedType = null;
    }
}

export { BuilderService };