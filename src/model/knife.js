import { Graphics, Sprite } from "pixi.js";
import { GameConstant } from "../gameConstant";
import { Util } from "../utils/utils";
import { Collider } from "./physics/collider";
import * as TWEEN from "@tweenjs/tween.js";
import { ColliderType, CollisionManagerEvent } from "../collision/collisionManager";
import { KnifeManager } from "./knifeManager";
import { Board } from "./board";
export const KnifeState = Object.freeze({
    DEFAULT: "default",
    ACTIVATED: "activated",
    ACTIVATING: "activating",
    ACTIVE: "active",
    MOVE: "move",
    OBSTACLE: "obstacle",
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
    }
    _initCollider() {
        this.collider = new Collider();
        this.collider.height = 150;
        this.addChild(this.collider);
        this.collider.on(CollisionManagerEvent.Colliding, (other)=>{
            if(other){
            console.log(123);
            };
            if(this.knifeOnBoard){
                this.colliderManager.add(this.collider, ColliderType.Static);
            }else{
                this.colliderManager.add(this.collider, ColliderType.Dynamic);
            }
        })

        this.collider.on(CollisionManagerEvent.Colliding, (other)=> {
          if (other.parent instanceof Board){
            this.addKnifeToBoard();
          }
        });
        if(this.onBoard){
            this.colliderManager.add(this.collider, ColliderType.Static);
             
        } else {
            this.colliderManager.add(this.collider, ColliderType.Dynamic);
        }
    }
    
    addKnifeToBoard() {
        this.speed = 0;
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.board.addKnife(this);
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
            case "active":
                this._toActive();
                break;
          
            case "obstacle":
                this.rotation += this.angleRotation * dt;
                break;

        }

    }
  
}
