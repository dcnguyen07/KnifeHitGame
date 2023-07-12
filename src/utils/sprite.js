import {Sprite} from 'pixi.js';

export default class SpriteObject extends Sprite{

    constructor(textureCache){
        super(textureCache);
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setVelocity(vx, vy){
        this.vx = vx;
        this.vy =  vy;
    }

    update(delta){
        this.x += this.vx * delta;
        this.y +=this.vy * delta;
    }
}

