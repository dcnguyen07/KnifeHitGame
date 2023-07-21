import { AnimatedSprite, Container, Filter, Graphics, Sprite, Texture } from "pixi.js";
import { Collider } from "./physics/collider";
import { Game } from "../scene/game";
import * as TWEEN from "@tweenjs/tween.js";
import { Util } from "../utils/utils";
import { GameConstant } from "../gameConstant";
import CircleCollider from "../collision/circleCollider";
import CollisionManager, { ColliderType, CollisionManagerEvent } from "../collision/collisionManager";
import { Knife } from "./knife";



export class Board extends Container {
    constructor(collisionManager) {
      super();
      this.collisionManager = collisionManager;
      this.boardSprite = new Sprite(Texture.from('board'));
      this.boardSprite.alpha = 1;
      this.boardSprite.anchor.set(0.5);
      this.angleRotation = 0.04;
      this.countRotation = 0;
      this.numRotation = 0;
      this.rotateDirection = 1;
      this.randomRotationToChange();
      this.sortableChildren = true;
      this.zIndex = 4;
      this.addChild(this.boardSprite);
      this.currentDt = 0;
      this.boardSprite.zIndex = 5;
      this._initCollider();
      this._initFragment();
      this.isBroken = false;
      this.knifeTarget = 6; 
      this.knifeCount = 0;
      this._initFilter();
    }
  
    
    _initCollider(){
      this.collider = new CircleCollider(0,  0, this.boardSprite.width / 2);
      this.addChild(this.collider);
      this.collider.on(CollisionManagerEvent.Colliding, (other)=> {
        this.emit("collider");
        this.onHit();
      })
      this.collisionManager.add(this.collider, ColliderType.Static);
      this.collider.zIndex = 110;
    }
    onHit() {
      new TWEEN.Tween(this).to({y: this.y - GameConstant.JUMP_DISTANCE}, GameConstant.JUMP_TIMER).yoyo(true).repeat(1).onUpdate(() => {
      }).onComplete(() => {
      }).start(this.currentDt);
    }
      update(dt){
      if(!this.isBroken){
        this.currentDt += dt;
        TWEEN.update(this.currentDt);
      if(this.isBroken){
        this.boardSprite.texture = null;
        this.angleRotation = 0;
      }else {
        this.rotation += this.angleRotation;
        this.changeRotation();
      }
    }
      
      }
      _initFilter() {
        this.boardFilter = new Filter();
        this.boardSprite.filters = [this.boardFilter];
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

      randomRotationToChange(){
        this.numRotationToChange = Util.random(2, 3);
      }

      removeAllKnife(){
        let knifes = this.children.filter(child => child instanceof Knife);
        knifes.forEach(knife => { 
         new  TWEEN.Tween(knife).to( { y: this.y + GameConstant.JUMP_DISTANCE, onComplete: () => {
        }});
      });
      this.removeChild(...knifes);
        }
     
      addKnife(knife){
        knife.collider.enable = false;
        knife.rotation = -this.rotation ;
        knife.anchor.set(0.5);
        knife.speed = 0;
        this.addChild(knife);
        let pos = this.toLocal(knife.position);
        knife.position.set(pos.x, pos.y);
        knife.isCollided = true;
        knife.zIndex = 3;
        this.knifeCount++;
          if (this.knifeCount === this.knifeTarget) {
            this.removeAllKnife();
            this.emit("knife"); 
          }
        }
      
      _initFragment() {
        this.fragments1 = new Sprite(Texture.from('fragment_lg_1'));
        this.fragments1.anchor.set(0.5);
        this.fragments1.scale.set(0.7);
        this.fragments1.rotation = -0.5;
        this.addChild(this.fragments1);
        this.fragments1.visible = false;
      
        this.fragments2 = new Sprite(Texture.from('fragment_md_1'));
        this.fragments2.anchor.set(0.5);
        this.fragments2.scale.set(0.8);
        this.addChild(this.fragments2);
        this.fragments2.visible = false;
      
        this.fragments3 = new Sprite(Texture.from('fragment_sm_1'));
        this.fragments3.anchor.set(0.5);
        this.fragments3.scale.set(0.8);
        this.addChild(this.fragments3);
        this.fragments3.visible = false;

      }
      breakUp() {
        this.boardSprite.visible = false;
        this.fragments1.visible = true;
        this.fragments2.visible = true;
        this.fragments3.visible = true;
        this.isBroken = true;
        new TWEEN.Tween(this.fragments1).to({x: 200, y: -2,rotation: this.fragments1.rotation + 3},25)
        .onComplete(() => {
          new TWEEN.Tween(this.fragments1)
          .to({ x: 280, y: 1500, rotation:this.fragments1.rotation + 4 },50)
          .start(this.currentDt);
        })
        .start(this.currentDt);
        
       new TWEEN.Tween(this.fragments2).to({x: 150, y: -300, rotation: this.fragments2.rotation + 3}, 25)
       .onComplete(() => {
         new TWEEN.Tween(this.fragments2).to({x: 300, y:1250, rotation: this.fragments2.rotation + 3}, 50)
         .start(this.currentDt);
        })
        .start(this.currentDt);
        
        new TWEEN.Tween(this.fragments3).to({x: -150, y: 300, rotation: this.fragments3.rotation + 3}, 25)
        .onComplete(() => {
          new TWEEN.Tween(this.fragments3).to({x: 300, y:1250, rotation: this.fragments3.rotation + 3}, 50)
          .start(this.currentDt);
        })
        .start(this.currentDt);
      }
    
    }
  
    