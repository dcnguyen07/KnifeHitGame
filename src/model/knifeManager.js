import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { Game } from "../scene/game";
import { Knife } from "./knife";
import { GameConstant } from "../gameConstant";
import { Util } from "../utils/utils";
import { ColliderType, CollisionManagerEvent } from "../collision/collisionManager";

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
        this.createKnifes(); 
        this.getKnife();
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
        knife.visible = false;
        this.knifes.push(knife);
        this.addChild(knife);
    }
    getKnife(){
        if(this.currentKnifeIndex >= this.knifes.length ){
            this.emit("Win");
            return ;
        }
        this.currentKnife = this.knifes[this.currentKnifeIndex];
        this.currentKnife.visible = true;
        this.currentKnife.collider.enable = true;
    }
   
    update(dt){
        this.knifes.forEach(knife => {
            knife.update(dt);            
        });

      
    }
   
    _onClicky(e){
        if(this.currentKnife ){
            this.currentKnife.move();
            this.currentKnifeIndex++;
            this.getKnife();
        }
    
    }
   
}
