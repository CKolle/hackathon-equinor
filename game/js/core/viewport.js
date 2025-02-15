import { Vector } from "../utils/vector.js";

const MIN_ZOOM = 3;
const MAX_ZOOM = 50;

class Viewport {
    constructor(displayWidth, displayHeight){
        this.displayWidth = displayWidth;
        this.displayHeight = displayHeight;
        this.position = new Vector();
        this.scale = 10;
    }

    getCellSize() { return this.displayWidth / this.scale; }
    getWidth() { return this.scale; }
    getHeight() { return this.scale * this.displayHeight / this.displayWidth; }

    zoom(multiplier, invert=false){
        if(invert) this.scale /= multiplier;
        else this.scale *= multiplier;
        this.scale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, this.scale));
    }

    pan(dx, dy){
        this.position.x += dx;
        this.position.y += dy;
    }

    screenToGrid(point){
        return new Vector(
            point.x / this.getCellSize() - this.position.x,
            point.y / this.getCellSize() - this.position.y
        );
    }

    gridToScreen(point){
        return new Vector(
            (point.x + this.position.x) * this.getCellSize(),
            (point.y + this.position.y) * this.getCellSize(),
        );
    }
}

export { Viewport }