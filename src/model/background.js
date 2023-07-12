import { Container, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../gameConstant";


export class Background extends Container {
    constructor(texture) {
        super(); 
        this._initSprite(texture);
        this.width = GameConstant.GAME_WIDTH;
        this.height = GameConstant.GAME_HEIGHT; 
    }
    _initSprite(texture) {
        this.backgroundSprite = new Sprite(Texture.from("background"));
        this.addChild(this.backgroundSprite);
    }
}
