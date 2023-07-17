import { AnimatedSprite, Container, Filter, Graphics, Sprite, Texture } from "pixi.js";
import { Collider } from "./physics/collider";
import { Game } from "../scene/game";
import * as TWEEN from "@tweenjs/tween.js";
import { Util } from "../utils/utils";
import { GameConstant } from "../gameConstant";
import CircleCollider from "../collision/circleCollider";
import CollisionManager, { ColliderType, CollisionManagerEvent } from "../collision/collisionManager";



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
      this.zIndex = 0;
      this.addChild(this.boardSprite);
      this.currentDt = 0;
      this.boardSprite.zIndex = 3;
      this._initCollider();
      // this._initFragrament();
   
    }
    onCollide(other){
    }
    
    _initCollider(){
      this.collider = new CircleCollider(0,  0, this.boardSprite.width / 2);
      this.addChild(this.collider);
      this.collider.on(CollisionManagerEvent.Colliding, this.onCollide, this)
      this.collisionManager.add(this.collider, ColliderType.Static);
    }
  
      update(dt){
      this.currentDt += dt;
      if(this.isBroken){
        this.boardSprite.texture = null;
        this.angleRotation = 0;
      }else {
        this.rotation += this.angleRotation;
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
      randomRotationToChange(){
        this.numRotationToChange = Util.random(2, 3);
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
        knife.zIndex = 2;
       
      }
      _initFragment() {
        const fragmentTextures1 = [
          Texture.from('fragment_lg_1')
        ];
        this.fragments1 = new AnimatedSprite(fragmentTextures1);
        this.fragments1.anchor.set(0.5);
        this.fragments1.scale.set(0.7);
        this.fragments1.rotation = -0.5;
        this.fragments1.visible = true;
      
        const fragmentTextures2 = [
          Texture.from('fragment_md_1')
        ];
        this.fragments2 = new AnimatedSprite(fragmentTextures2);
        this.fragments2.anchor.set(0.5);
        this.fragments2.scale.set(0.7);
        this.fragments2.visible = true;
      
        const fragmentTextures3 = [
          Texture.from('fragment_sm_1')
        ];
        this.fragments3 = new AnimatedSprite(fragmentTextures3);
        this.fragments3.anchor.set(0.5);
        this.fragments3.scale.set(0.8);
        this.fragments3.visible = true;
      }
      
      breakUp() {
        this.fragments1.visible = true;
        this.fragments1.play();
        this.fragments1.animationSpeed = 0.12 ;
      
    
        this.fragments2.visible = true;
        this.fragments2.play();
        this.fragments2.animationSpeed = 0.12;
        
    
        this.fragments3.visible = true;
        this.fragments3.play();
        this.fragments3.animationSpeed = 0.12;  
       
      }
    
    }
  

