import { Point, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";

export class Collider extends Sprite {
    constructor(){
        super();
        this.width = 40;
        this.height = 350;
        this.anchor.set(0.5);
        this.texture = Texture.WHITE;
        this.visible = false;
        if(GameConstant.DEBUG_DRAW_COLLIDER){
            this.visible = true;
            this.texture = Texture.WHITE;
        }
    }
    getPosition(){
        if (this._tmpPos) {
            this.getGlobalPosition(this._tmpPos, true);
        }
        else {
            this._tmpPos = new Point();
            this.getGlobalPosition(this._tmpPos);
        }
        this._tmpPos.x -= this.width * this.anchor.x;
        this._tmpPos -= this.height * this.anchor.y;
        return this._tmpPos;
    }
}