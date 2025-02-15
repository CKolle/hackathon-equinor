const SECONDS_PER_DAY = 3600 * 24;

class SimTimeSystem {
    constructor(secondsPerGameDay = 60 * 5){
        this.timeOfDay = 0;
        this.day = 0;
        this.realToGameTime = SECONDS_PER_DAY / secondsPerGameDay;
    }
    
    update(gameState, dt){
        this.timeOfDay += dt * this.realToGameTime;
        if(this.timeOfDay > SECONDS_PER_DAY){
            this.timeOfDay -= SECONDS_PER_DAY;
            this.day += 1;
        }
    }

    getDayProgress(){
        return this.timeOfDay / SECONDS_PER_DAY;
    }
}

export { SimTimeSystem };