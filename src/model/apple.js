import { Assets, Sprite, Texture } from "pixi.js";
import { Collider } from "./physics/collider";
import * as TWEEN from "@tweenjs/tween.js";
import { GameConstant } from "../gameConstant";
import { ColliderType, CollisionManagerEvent } from "../collision/collisionManager";
import { Sound } from "@pixi/sound";
export class Apple extends Sprite {
  constructor(texture, colliderManager){
    super(texture);
    this.colliderManager = colliderManager;
    this.angleRotation = 0;
    this.currentTime = 0;
    this._initCollider();
    this.sound();
  }
  sound(){
    let soundapple = Assets.get("knife_hit_apple")
    this.knifeHitApple = Sound.from(soundapple);
  }
  _initCollider(){
    this.collider = new Collider();
    this.collider.width = this.width;
    this.collider.height = this.height - 10 ;
    this.addChild(this.collider);
    this.colliderManager.add(this.collider, ColliderType.Static);
    this.collider.on(CollisionManagerEvent.Colliding,(other) => {
    if(other){
      this.knifeHitApple.play();
      this.emit("apple");
     
    }
    });
  }
  update(dt){
    if(!this.isFall){
      this.rotation += this.angleRotation * dt;
    }else {
      this.y += 20 * dt + 1/2 * 9.8 * dt * dt;
      this.rotation += 0.1 * dt;
    }
    this.currentTime += dt;
  }
 
  }
