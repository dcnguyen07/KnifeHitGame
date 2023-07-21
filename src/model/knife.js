import { Assets, Graphics, Sprite } from "pixi.js";
import { GameConstant } from "../gameConstant";
import { Collider } from "./physics/collider";
import * as TWEEN from "@tweenjs/tween.js";
import { ColliderType, CollisionManagerEvent } from "../collision/collisionManager";
import { KnifeManager } from "./knifeManager";
import { Board } from "./board";

import { Sound } from "@pixi/sound";
export const KnifeState = Object.freeze({
    DEFAULT: "default",
    ACTIVATED: "activated",
    ACTIVATING: "activating",
    ACTIVE: "active",
    MOVE: "move",
    FALL: "fall",
  });

export class Knife extends Sprite {
    constructor(texture, colliderManager, board) {
        super(texture);
        this.onBoard = false;
        this.board = board;
        this.colliderManager = colliderManager;
        this.anchor.set(0.5, 0);     
        this.state = KnifeState.DEFAULT;    
        this.speed = 0;
        this.angleRotation = 0;
        this.currentTime = 0;
        this.isCollided = false;
        this._initCollider();
        this._initColliderStatic();
        this.sound();
    }
    _initCollider() {
        this.collider = new Collider();
        this.collider.height = 150;
        this.addChild(this.collider);
        this.collider.on(CollisionManagerEvent.Colliding, (other)=> {
            if (other.parent instanceof Board){
                this.addKnifeToBoard();
            } else if(other.parent instanceof Knife){
                this.setFall();
                this.knifeHitKnife.play();
             console.log("lose");
            }
        });
        this.colliderManager.add(this.collider, ColliderType.Dynamic);
    }
    _initColliderStatic(){
        this.colliderStatic = new Collider();
        this.colliderStatic.height = 100;
        this.addChild(this.colliderStatic);
        this.colliderManager.add(this.colliderStatic, ColliderType.Static);
        this.colliderStatic.enable = false;
        this.colliderStatic.on(CollisionManagerEvent.Colliding, (other)=> {
            
        });
    }
    sound(){
        let soundknife = Assets.get("knife_hit_knife");
        this.knifeHitKnife = Sound.from(soundknife);
    }
    addKnifeToBoard() {
        if(this.state === KnifeState.FALL){
            return;
        }
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.board.addKnife(this);
        this.colliderStatic.enable = true;
        this.state = KnifeState.DEFAULT;
    }
    move() {
        this.state = KnifeState.MOVE;
        this.speed = 70;
    
    }
    update(dt) {
        if(this.isCollided) {
            return;
        }
        this.currentTime += dt;
        switch (this.state) {
            case "move":
                this.y -= this.speed * dt;
                break;
            case "obstacle":
                this.rotation += this.angleRotation * dt;
                break;
        }

    }
    setFall() {
        this.state = KnifeState.FALL;
        this.colliderStatic.enable = false;
        this.collider.enable = false;
        this.speed = 0; 
        this.isCollided = true;
        new TWEEN.Tween(this).to({ y: "+500", rotation: this.rotation + 7 }, 20).onComplete(()=>{
        })
        .start(this.currentTime);
    }
    

}
