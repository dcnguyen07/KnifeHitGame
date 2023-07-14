import { Graphics, Sprite } from "pixi.js";
import { GameConstant } from "../gameConstant";
import Collider, { ColliderEvent } from "./collider";

export default class RectCollider extends Sprite{
    constructor (X, Y, width, height){
        super();
        this.X = X;
        this.Y = Y;
        this.width = width ;
        this.height = height ;
        if(GameConstant.DEBUG_DRAW_COLLIDER){
            this.graphic = new Graphics();
            this.graphic.beginFill(0x000000, 1);
            this.graphic.drawRect(0, 0, this.width, this.height);
            this.graphic.endFill();
            this.addChild(this.graphic);
        }
    }
}
