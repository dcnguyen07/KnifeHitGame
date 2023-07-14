
import { Graphics, Sprite } from "pixi.js";
import { GameConstant } from "../gameConstant";
export default class CircleCollider extends Sprite {
 constructor(x, y, radius){
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.enable = true;
    if(GameConstant.DEBUG_DRAW_COLLIDER){
      this.graphic = new Graphics();
      this.graphic.beginFill(0x000000, 1);
      this.graphic.drawCircle(0, 0, this.radius);
      this.graphic.endFill();
      this.addChild(this.graphic);
    }
 }
}