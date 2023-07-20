import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { Util } from "../utils/utils";
import { Apple } from "./apple";
import { GameConstant } from "../gameConstant";
import * as TWEEN from "@tweenjs/tween.js";
import { Game } from "../scene/game";
import { Collider } from "./physics/collider";
import { ColliderType, CollisionManagerEvent } from "../collision/collisionManager";
export class AppleManager extends Container{
    constructor(container, colliderManager){
        super();
        this.appleContainer = container;
        this.colliderManager = colliderManager;
        this.apples = [];
        this.numOfApple = Util.randomInteger(0, 3);
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
        let apple = new Apple(Game.bundle.apple, this.colliderManager);
        apple.anchor.set(0.5, -2.75);
        apple.collider.anchor.set(0.5, -3);
        apple.collider.on(CollisionManagerEvent.Colliding, (other)=> {
            this.appleContainer.removeChild(apple);
            let index = this.apples.indexOf(apple);
            if(index >= 0){
                this.apples.splice(index, 1);
                this.removeApple();
            }
            apple.destroy();
        });
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
    removeApple(apple) {
        let slice1 = new Sprite(Texture.from("apple_slice_1"));
        slice1.anchor.set(0.5);
        this.addChild(slice1);
    
        let slice2 = new Sprite(Texture.from("apple_slice_2"));
        slice2.anchor.set(0.5);
        this.addChild(slice2);
    
        new TWEEN.Tween(slice1).to({x: slice1.x - 90, y: slice1.y - 120}, 13).onComplete(() => {
            new TWEEN.Tween(slice1).to({x: slice1.x - 150, y: 1350}, 35).start(this.currentTime).onComplete(() => {
                this.removeChild(slice1);
                slice1.destroy();
            });
        }).start(this.currentTime);
        new TWEEN.Tween(slice2).to({x: slice2.x + 150, y: 1350}, 35).start(this.currentTime).onComplete(() => {
            this.removeChild(slice2);
            slice2.destroy();
        });
       
    }
    }
    
