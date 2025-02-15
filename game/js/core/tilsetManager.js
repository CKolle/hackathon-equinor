import {cells} from "./cell.js";

class TilesetManager {
    constructor() {
        this.tileset = new Image()
        this.tileSize = 16;
        this.load();
    }

    async load() {
        return new Promise((resolve, reject) => {
            this.tileset.onload = () => {
                resolve();
            }
            this.tileset.onerror = reject;
            this.tileset.src = "assets/tileset.png";
            this.loaded = true;
        });
    }
    getTileSourceRect(cellType, tileOffset, x, y, time) {
        const tile = config["cells"][cellType];
        const electedTile = tile.tiles.default;
        let xPos = electedTile.bounds[0];
        let yPos = electedTile.bounds[1];
        if(electedTile.frames){
            // Animated tiles shift the xPos along for each frame
            let frameIndex = Math.floor((time * electedTile.framerate*0.001) % electedTile.frames);
            xPos += electedTile.bounds[2] * frameIndex;
        }
    
        let random = x * 55 + y * 13 + 2*(x%3) + 3*(x%4) + 5*(y%3) + x;
    
        if (electedTile.shuffle) {
            xPos += random % electedTile.bounds[2];
            yPos += random % electedTile.bounds[3];
        } else {
            xPos += tileOffset.x;
            yPos += tileOffset.y;
        }
    
        return {
            x: xPos * this.tileSize,
            y: yPos * this.tileSize,
            width: this.tileSize,
            height: this.tileSize
        };
    }
}


export { TilesetManager };