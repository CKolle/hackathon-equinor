import {cells} from "./cell.js";

class TilesetManager {
    constructor() {
        this.tileset = new Image()
        this.tileSize = 16;
    }

    getTileSourceRect(cellType, tileOffset) {
        const tile = config["cells"][cellType];
        const electedTile = tile.tiles.default;
        let xPos = electedTile.bounds[0];
        let yPos = electedTile.bounds[1];
        return {
            x: (xPos+tileOffset.x) * this.tileSize,
            y: (yPos+tileOffset.y) * this.tileSize,
            width: this.tileSize,
            height: this.tileSize
        };
    }
}


export { TilesetManager };