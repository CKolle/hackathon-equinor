import { cells } from "./cell.js";

class BuilderService {
    constructor(grid){
        this.selectedType = cells.WINDMILL;
        this.grid = grid;
    }
    attemptBuild(position){
        if(this.selectedType){
            console.log(this.selectedType, position.x, position.y,"awdawd");
            this.grid.update(cells.CITY, 7, 0);
            this.grid.update(this.selectedType, position.x, position.y);
            this.selectedType = null;
            console.log(this.grid.cells);
        }
    }
}

export { BuilderService };