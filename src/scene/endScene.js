import { Text, TextStyle } from "pixi.js";
import Scene from "../models/scene";
import { getShadowTextStyle } from "../utils/utils";

export default class EndScene extends Scene {
    constructor(message) {
        super();
        this.message = message;

       this.style = getShadowTextStyle(64);
       this.text = new Text(this.message, this.style);
       this.addChild(this.text);
       this.text.anchor.set(0.5, 0.5);
    }
    setMessage(message){
        this.message = message;
        this.text.text = this.message;
    }
}