import { AnimatedSprite, Container, Filter, Graphics, Sprite, Texture } from "pixi.js";
import { Collider } from "./physics/collider";
import { Game } from "../scene/game";
import * as TWEEN from "@tweenjs/tween.js";
import { Util } from "../utils/utils";
import { GameConstant } from "../gameConstant";


export class Board extends Container {
    constructor() {
      super();
      this.boardSprite = new Sprite(Texture.from('board'));
      this.boardSprite.alpha = 1;
      this.boardSprite.anchor.set(0.5);
      this.angleRotation = 0.04;
      this.countRotation = 0;
      this.numRotation = 0;
      this.rotateDirection = 1;
      this._initCollider();
      this.randomRotationToChange();
      this._initFilter();
      this.sortableChildren = true;
      this.zIndex = 0;
      this.addChild(this.boardSprite);
      this.currentDt = 0;
    }
    
    _initCollider(){
      this.collider = new Collider();
      this.collider.width = 200;
      this.collider.height = 150;
      this.collider.zIndex = 110;
      this.addChild(this.collider);
    }
  
    _initFilter(){
      this.boardFilter = new Filter();
      this.boardSprite.filters = [this.boardFilter];
    }
 
      update(dt){
      this.currentDt += dt;
      if(this.isBroken){
        this.boardSprite.texture = null;
        this.angleRotation = 0;
      }else {
       
        this.boardSprite.rotation += this.angleRotation;
        this.changeRotation();
      }
      
      }
      changeRotation(){
        this.countRotation += Math.abs(this.angleRotation);
        this.numRotation = this.countRotation / (Math.PI * 2);
        if(this.numRotation >= this.numRotationToChange){
          if (this.rotateDirection === 1){
            this.angleRotation -= 1/2400;
            if (this.angleRotation <= 0){
              this.countRotation = 0;
              this.numRotation = 0;
              this.randomRotationToChange();
              this.rotateDirection = Util.randomInteger(0, 1);
            }
          }else {
            this.angleRotation += 1/2400;
            if(this.angleRotation >= 0){
              this.countRotation = 0;
              this.numRotation = 0;
              this.randomRotationToChange();
              this.rotateDirection = Util.randomInteger(0, 1);
            }
          }
        }else if (this.angleRotation < 0.05 && this.rotateDirection === 1){
          this.angleRotation += 1/2000;
        }else if (this.angleRotation > -0.05 && this.rotateDirection === 0){
          this.angleRotation -= 1/2000;
        }
      }
      onHit(){
        new TWEEN.Tween({y: this.y}).to({y: this.y - 50}, GameConstant.JUMP_TIMER).yoyo(true).repeat(1).onUpdate((data)=>{
          this.boardFilter.gamma = 1.5;
          this.y = data.y;
        }).onComplete(() => {
          this.boardFilter.gamma = 1;
        }).start(this.currentDt);
      }
      randomRotationToChange(){
        this.numRotationToChange = Util.random(2, 3);
      }
    }
  

