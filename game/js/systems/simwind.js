class SimWindSystem {
    update(gameState, dt){
        let time = gameState.factors["time"];
        let dayIndex = time.day;
        let p = time.p;
        let floatingTarget = (dayIndex + p) * 24;
        let baseIndex = Math.floor(floatingTarget);
        p = floatingTarget-baseIndex;
        let thisHour = config["weather"][baseIndex];
        let nextHour = config["weather"][baseIndex+1];
        function get(hour, column, def=0){
            return hour[column] ? hour[column] : def
        }
        gameState.factors["wind"] = get(nextHour,"wind_speed")*p+(1-p)*get(thisHour,"wind_speed");
        gameState.factors["temperature"] = get(nextHour,"temperature")*p+(1-p)*get(thisHour,"temperature");
    }
}

export { SimWindSystem };