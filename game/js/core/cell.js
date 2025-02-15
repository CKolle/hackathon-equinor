class Cell {
    constructor(x, y, acceptsElectricity = false){
        this.x = x;
        this.y = y;
        this.acceptsElectricity = acceptsElectricity;
        this.electricityLevel = 0;
        this.type = cells.EMPTY;
    }

    setType(type){
        this.type = type;
    }
}

const cells = Object.freeze({
    EMPTY: "Empty",
    WINDMILL: "Windmill",
    CABLE: "Cable",
    CITY: "City",
});

export { cells };
export { Cell };