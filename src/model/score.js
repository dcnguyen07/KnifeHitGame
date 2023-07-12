import { Text } from "pixi.js";
import { getShadowTextStyle } from "../utils/utils";

export default class Score extends Text {
    constructor(x, y, score = 0, style = getShadowTextStyle(30)){
        super(score, style)
        this.x = x;
        this.y = y;
        this.score = score;
        this.anchor.set(0.5)
    }
setScore(score) {
    this.score = score;
    this.text = score;
} 
updateScore(step){
    this.score += step;
    this.text = this.score;
}  
}