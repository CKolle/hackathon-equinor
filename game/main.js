import { Renderer } from "./js/core/renderer.js";
import { Engine } from "./js/core/engine.js";
import { Grid } from "./js/core/grid.js";
import { cells } from "./js/core/cell.js";
import { InputService } from "./js/core/inputService.js";
import { BuilderService } from "./js/core/builderService.js";

const ZOOM_AMOUNT = 1.1;

class Game {
    constructor() {
        this.grid = new Grid(20, 15);
        this.renderer = new Renderer(document.getElementById("gameCanvas"));
        // Scale the canvas to fit the screen

        this.viewport = this.renderer.viewport;
        

        this.inputService = new InputService(this.renderer.canvas);

        window.addEventListener("resize", this.handleResize.bind(this));


        this.inputService.onMouseMove = (mouse)=>{
            if(mouse.button==0) return;
            this.viewport.pan(
                mouse.dx / this.viewport.getCellSize(),
                mouse.dy / this.viewport.getCellSize()
            );
        }
        
        this.inputService.onScroll = (mouse)=>{
            // Get the current center of the viewport in world coordinates
            let centerX = this.viewport.position.x + this.viewport.getWidth() / 2;
            let centerY = this.viewport.position.y + this.viewport.getHeight() / 2;
            // console.log(centerX, centerY, this.viewport.position.x, this.viewport.position.y);
            
            // Apply the zoom
            this.viewport.zoom(ZOOM_AMOUNT, mouse.scroll < 0);
        
            // Calculate the new center after zoom
            let newCenterX = this.viewport.position.x + this.viewport.getWidth() / 2;
            let newCenterY = this.viewport.position.y + this.viewport.getHeight() / 2;
        
            // Compute the difference and adjust the pan to keep the center stable
            this.viewport.pan(
                newCenterX-centerX,
                newCenterY-centerY,
            );
        }

        this.grid = new Grid(20, 15);
        this.builderService = new BuilderService(this.grid);
        
        this.inputService.onClick = (mouse)=>{
            if(this.builderService.selectedType){
                let buildPos = this.viewport.screenToGrid(mouse.screenPos).floor();
                // console.log(`Attempting to build ${this.builderService.selectedType} on `,buildPos.x,buildPos.y);
                this.builderService.attemptBuild(buildPos);
            }
        }
        
        this.engine = new Engine(this.renderer, this.grid);

    }

    handleResize() {
        const width = window.innerWidth - 20;
        const height = window.innerHeight - 30;
        this.renderer.resize(width, height);
    }

    start() {
        console.log("Game starting...");
        this.engine.start();
    }
}

const game = new Game();

window.addEventListener("load", () => {
    game.start();
    addStartupCells();
});



function addStartupCells() {
    // Adds a windmill, a cable and a city
    game.grid.update(cells.WINDMILL, 0, 0);
    game.grid.update(cells.CABLE, 1, 0);
    game.grid.update(cells.CITY, 2, 0);
}