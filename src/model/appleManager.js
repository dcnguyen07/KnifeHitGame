import { Container, Graphics } from "pixi.js";
import { Util } from "../utils/utils";
import { Apple } from "./apple";
import { GameConstant } from "../gameConstant";
import * as TWEEN from "@tweenjs/tween.js";
import { Game } from "../scene/game";
export class AppleManager extends Container{
    constructor(container){
        super();
        this.appleContainer = container;
        this.apples = [];
        this.numOfApple = Util.randomInteger(0, 2);
        this.boardAngleRotation = 0;
        this.graphic = new Graphics();
        this.addChild(this.graphic);
        this.currentTime = 0;
    }
    _spawnApples(avaiAngle){
        for (let i = 0; i< this.numOfApple; i++){
            this._spawnApple(avaiAngle);
        }
    }
    _spawnApple(avaiAngle){
        let apple = new Apple(Game.bundle.apple);
        apple.anchor.set(0.5, -2);
        apple.collider.anchor.set(0.5, -3);
        this._setAppleAng(apple, avaiAngle);
        this.apples.push(apple);
        this.appleContainer.addChild(apple); 
    }
    _setAppleAng(apple, avaiAngle){
        let i = Util.randomInteger(0, 17);
        while (!avaiAngle[i].available){
            if(i === 17){
                i = 0;
            }else {
                ++i;
            }
        }
        apple.angle = avaiAngle[i].angle;
        avaiAngle[i].available = false;
    }
    update(dt){
        this.currentTime += dt;
        TWEEN.update(this.currentTime);
        this.graphic.clear();
        this.apples.forEach(apple => {
            apple.update(dt);
            apple.angleRotation = this.boardAngleRotation;
        })
    }
    setApplesFall(){
        this.apples.forEach(apple =>  {
            apple.setFall();
        })
    }
    onBoardHit(){
        this.apples.forEach(apple =>{
            apple.moveUpABit();
        })
    }
}