
import { Graphics, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../gameConstant";
export default class CircleCollider extends Sprite {
 constructor(x, y, radius){
    super(Texture.WHITE);
    this.x = x;
    this.y = y;
    this.anchor.set(0.5);
    this.radius = radius;
    this.visible = GameConstant.DEBUG_DRAW_COLLIDER;
    if(this.visible){
      // let graphic = new Graphics();
      // graphic.beginFill(0x00000, 1);
      // graphic.drawCircle(this.x,  this.y, this.radius);
      // graphic.endFill();
      // this.addChild(graphic);
    }
    this.enable = true;
 }
}