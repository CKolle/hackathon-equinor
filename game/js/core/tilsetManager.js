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


    getTileSourceRect(cellType, tileOffset) {
        const tile = config["cells"][cellType];
        const electedTile = tile.tiles.default;
        let xPos = electedTile.bounds[0] + tileOffset.x;
        let yPos = electedTile.bounds[1] + tileOffset.y;
        return {
            x: xPos * this.tileSize,
            y: yPos * this.tileSize,
            width: this.tileSize,
            height: this.tileSize
        };
    }
}


export { TilesetManager };