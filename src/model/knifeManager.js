import { Container, Graphics } from "pixi.js";
import { Game } from "../scene/game";
import { Knife } from "./knife";
import { GameConstant } from "../gameConstant";
import { Util } from "../utils/utils";

export class KnifeManager extends Container {
    constructor() {
        super();
        this.knifes = [];
        this.obsKnifes = [];
        this.numOfKnife = GameConstant.KNIFE_NUMBER - 1; 
        this.boardAngleRotation = 0;
        // this.graphic = new Graphics();
        this.createKnifes(); 
        this.createObsKnifes();
        window.addEventListener("mousedown", (e) => this._onClicky(e));
    }

    createKnifes() { 
        this.firstKnife();
        for (let i = 0; i < this.numOfKnife; i++){
            this.anotherKnife();
        }
    }

    firstKnife(){
        let knife = new Knife(Game.bundle.knife);
        knife.x = GameConstant.KNIFE_X_POSITION;
        knife.y = GameConstant.KNIFE_Y_POSITION;
        knife.isActive = true;
        this.knifes.push(knife);
        this.addChild(knife);
    }
    anotherKnife(){
        let knife = new Knife(Game.bundle.knife);
        knife.x = GameConstant.KNIFE_X_POSITION;
        knife.y = GameConstant.KNIFE_Y_POSITION;
        knife.visible = true;
        this.knifes.push(knife);
        this.addChild(knife);
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
        knife.anchor.set(0.5, -0.5);
        knife.collider.anchor.set(0.5, -0.5);
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
        if(this.knifes[0].isActive){
            this.knifes[0].move();
            return true;
        }else {return false;}
    }
    onBoardHit(){
        this.obsKnifes.forEach(obs => {
            obs.moveUpABit();
        })
    }
}
