import { Container, Graphics } from "pixi.js";
import { Game } from "../scene/game";
import { Knife } from "./knife";
import { GameConstant } from "../gameConstant";
import { Util } from "../utils/utils";

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
        this.createObsKnifes();
        window.addEventListener("mousedown", (e) => this._onClicky(e));
        // this.collider = new CircleCollider(this.x, this.y, this.radius);
        // this.collider.on(CollisionManagerEvent.Colliding, this.onCollide, this)
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
            console.log("On Lose");
            this.currentKnife = null;
            return;
        }
        this.currentKnife = this.knifes[this.currentKnifeIndex];
        this.currentKnife.visible = true;
        
    }
    createObsKnifes(avaiAngle){
        let numOfDefautObs = Math.round( Util.random(0.3));
        for (let i = 0; i < numOfDefautObs; i++){
            this.createObs(avaiAngle);
        }
    }
    createObs(avaiAngle){
        let knife = new Knife(Game.bundle.knife);
        knife.x = GameConstant.BOARD_X_POSITION;
        knife.y = GameConstant.BOARD_Y_POSITION;
        this._setObsAng(knife, avaiAngle);
        knife.beObss();
        this.obsKnifes.push(knife);
        this.addChild(knife);
    }
    _setObsAng(obs,  avaiAngle){
        let i = Math.round(Util.random(0.17));
        while (!avaiAngle[i].available){
            if (i == 17){
                i = 0;
            }else{
                ++i;
            }
        }
        obs.angle = avaiAngle[i].angle;
        avaiAngle[i].available = false;
    }
    
    update(dt){
        this.knifes.forEach(knife => {
            knife.update(dt);
                        
        });

        this.obsKnifes.forEach(obs => {
            obs.angleRotation = this.boardAngleRotation;
            obs.update(dt);
        })
    }
    setObsFall(){
        this.obsKnifes.forEach(obs => {
            obs.x = obs.collider.getBounds().x + obs.collider.getBounds().width/2;
            obs.y = obs.collider.getBounds().y + obs.collider.getBounds().height/2;
            obs.anchor.set(0.5);
            obs.collider.anchor.set(0.5);
            obs.setEndFall();
        })
    }
    _onClicky(e){
        if(this.currentKnife ){
            this.currentKnife.move();
            this.currentKnifeIndex++;
            this.getKnife();
        }
    
    }
    onBoardHit(){
        this.obsKnifes.forEach(obs => {
            obs.moveUpABit();
        })
    }
}
