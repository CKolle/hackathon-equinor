import { Vector } from "../utils/vector.js";

const MIN_ZOOM = 1;
const MAX_ZOOM = 50;

class Viewport {
    constructor(displayWidth, displayHeight){
        this.displayWidth = displayWidth;
        this.displayHeight = displayHeight;
        this.aspectRatio = displayWidth / displayHeight;
        this.position = new Vector();
        this.scale = 10;
    }

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
            (point.x-this.position.x)/this.displayWidth*this.scale,
            (point.y-this.position.y)/(this.displayHeight*this.aspectRatio)*this.scale
        );
    }

    gridToScreen(point){
        return new Vector(
            point.x/this.scale*this.displayWidth+this.position.x,
            point.y/this.scale*(this.displayHeight*this.aspectRatio)+this.position.y
        );
    }
}

export { Viewport }