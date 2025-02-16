export class PlayerLevelingSystem {
    constructor(){
        this.funds = 2000;
    }
    
    update(gameState, dt){
        this.funds += gameState.factors["profitable"] * dt;
        // console.log(this.funds);
    }
}