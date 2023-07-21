import { Container } from "pixi.js";
import { Game } from "../scene/game";
import { Knife } from "./knife";
import { GameConstant } from "../gameConstant";
import { Util } from "../utils/utils";
import { ColliderType, CollisionManagerEvent } from "../collision/collisionManager";
import { Collider } from "./physics/collider";
import { Sound } from "@pixi/sound";
import * as TWEEN from "@tweenjs/tween.js";

export class KnifeManager extends Container {
    constructor(colliderManager, board) {
        super();
        this.board = board;
        this.colliderManager = colliderManager;
        this.knifes = [];
        this.obsKnifes = [];
        this.numOfKnife = GameConstant.KNIFE_NUMBER - 1; 
        this.boardAngleRotation = 0;
        this.currentKnifeIndex = 0;
        this.currentDt = 0;
        this.createKnifes();
        window.addEventListener("mousedown", (e) => this._onClicky(e));
    }
    
    createKnifes() { 
        for (let i = 0; i < this.numOfKnife; i++){
            this.addKnife();
        }
    }
    
    addKnife(){
        let knife = new Knife(Game.bundle.knife, this.colliderManager, this.board);
        knife.x = GameConstant.KNIFE_X_POSITION;
        knife.y = GameConstant.KNIFE_Y_POSITION;
        this.knifes.push(knife);
        this.addChild(knife);
    }
    
    getKnife() {
        if (this.currentKnifeIndex >= this.knifes.length ) {
            return;
        }
        return this.knifes[this.currentKnifeIndex];
       
    }
    update(dt){
        this.knifes.forEach(knife => {
            knife.update(dt);            
        });
        
    }
    _onClicky(e){
        let knife = this.getKnife();
        if(knife){
            this.currentKnifeIndex++;
            knife.move();
        }
    }
   
}