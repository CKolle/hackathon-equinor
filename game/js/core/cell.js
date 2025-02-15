class Cell {
    constructor(x, y, acceptsElectricity = true){
        this.x = x;
        this.y = y;
        this.acceptsElectricity = acceptsElectricity;
        this.electricityLevel = 0;
    }
}

const cells = Object.freeze({
    WINDMILL: "Windmill",
    CABLE: "Cable",
    CITY: "City",
});