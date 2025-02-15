class SimWindSystem {
    update(gameState, dt){
        let time = gameState.factors["time"];
        let dayIndex = time.day;
        let p = time.p;
        gameState.factors["wind"] = this.lightIntensity;
    }
}

export { SimWindSystem };