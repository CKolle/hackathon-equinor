const SECONDS_PER_DAY = 3600 * 24;

class SimTimeSystem {
    constructor(secondsPerGameDay = 60 * 1){
        this.timeOfDay = SECONDS_PER_DAY / 4; // Start at dawn
        this.day = 0;
        this.realToGameTime = SECONDS_PER_DAY / secondsPerGameDay;
        this.lightIntensity = 0;
    }
    
    update(gameState, dt){
        this.timeOfDay += dt*0.001 * this.realToGameTime;
        if(this.timeOfDay > SECONDS_PER_DAY){
            this.timeOfDay -= SECONDS_PER_DAY;
            this.day += 1;
        }

        // Calculate the light intensity
        let p = this.getDayProgress();
        this.lightIntensity = Math.sin(p*Math.PI*2)*0.4+0.6;
        gameState.factors["sun"] = this.lightIntensity;
        gameState.factors["time"] = {"day":this.day, "p":p};
    }

    getDayProgress(){
        return this.timeOfDay / SECONDS_PER_DAY;
    }
}

export { SimTimeSystem };