import {cells} from "./cell.js";

class TilesetManager {
    constructor() {
        this.tileset = new Image()
        this.loaded = false;
        this.tileSize = 16;
        this.tileDefs = {
            [cells.EMPTY]: { x: 6, y: 6 , width: 1, height: 1},
            [cells.WINDMILL]: { x: 0, y: 0 , width: 2, height: 2},

        }

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

    getTileSourceRect(cellType) {
        const tile = this.tileDefs[cellType];
        if (!tile) return this.tileDefs[cells.EMPTY];

        let xPos = tile.x;
        let yPos = tile.y;

        return {
            x: xPos * this.tileSize,
            y: yPos * this.tileSize,
            width: tile.width * this.tileSize,
            height: tile.height * this.tileSize
        };
    }

    getDefinition(cellType) {
        return this.tileDefs[cellType];
    }


}


export { TilesetManager };