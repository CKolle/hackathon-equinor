export class Timeseries {
    constructor(name, posX, posY, width = 200, height = 100) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.data = {date: [1,2,3,4,5], values: [5,2,3,2,5]};
    }

    update(deltaTime) {
        this.data.date.push(deltaTime);
        console.log("ok");
        this.data.values.push(Math.random()*10); // testing value
    }
}