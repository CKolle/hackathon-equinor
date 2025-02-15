import { cells } from "./cell.js";

class BuilderService {
    constructor(grid){
        this.selectedType = cells.WINDMILL;
        this.grid = grid;
    }
    attemptBuild(position){
        this.grid.update(this.selectedType, position.x, position.y);
        this.selectedType = null;
    }
}

export { BuilderService };