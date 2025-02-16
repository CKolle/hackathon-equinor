export class PlayerLevelingSystem {
    constructor(){
        this.funds = 200;
    }
    
    update(gameState, dt){
        this.funds += gameState.factors["profitable"] * dt;
        // console.log(this.funds);
    }
}