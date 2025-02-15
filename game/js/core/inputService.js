import { Vector } from "../utils/vector.js";

class InputService {
    constructor(canvasElement){
        this.cursor = {
            button: 0,
            screenPos: new Vector(),
        };

        canvasElement.addEventListener("mousedown", (e)=>{
            this.cursor.button = e.buttons;
            e.preventDefault();
        });
        
        canvasElement.addEventListener("mouseup", (e)=>{
            this.cursor.button = e.buttons;
            e.preventDefault();
        });

        canvasElement.addEventListener("mousemove", (e)=>{
            this.cursor.screenPos.x = e.clientX;
            this.cursor.screenPos.y = e.clientY;
            e.preventDefault();
        });
    }
}

export { InputService }