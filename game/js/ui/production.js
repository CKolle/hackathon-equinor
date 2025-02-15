export class Production {
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
        // console.log("ok");
        this.data.values.push(this.data.values[this.data.values.length-1] + Math.random()*10-5); // testing value

        if (this.data.date.length > 1000) {
            this.data.date.shift();
        }
        if (this.data.values.length > 1000) {
            this.data.values.shift();
        }
    
    }
}