import { Assets, Container, Sprite, Texture  } from "pixi.js";
import { Board } from "../model/board";
import { KnifeManager } from "../model/knifeManager";
import { Background } from "../model/background";
import { GameConstant } from "../gameConstant";
import startGame from "../model/startGame";
import { AppleManager } from "../model/appleManager";
import * as TWEEN from "@tweenjs/tween.js";
import { Util } from "../utils/utils";
import CollisionManager from "../collision/collisionManager";
import { Sound } from "@pixi/sound";

export const GameState = Object.freeze({
    Tutorial: "tutorial",
    Playing: "playing",
    Win: "win",
    Lose: "lose",
  });
  export const Level1 = Object.freeze({
    KNIFE_NUMBER: 7,
  });
  export class PlayScene extends Container {
    constructor() {
      super();
      this.state = GameState.Tutorial;
      this.score = 0;
      this.appleScore = 0;
  
      this._initGamePlay();
      this.currentDt = 0;
   
    }
  
    _initGamePlay() {
      this.gameplay = new Container();
      this.gameplay.eventMode = "static";
      this.gameplay.sortableChildren = true;
      this.knifeNumber = Level1.KNIFE_NUMBER;
      this.addChild(this.gameplay);
      this._initCollisionManager();
      this._initBackground();
      this._initBoard(); 
      this._initKnifeManager();
      this._initObstacle();
      this._initSound();
    
    }

    _initCollisionManager(){
      this.collideManager = new CollisionManager();
      // this.addChild(this.collideManager);
    }
  
  // _initStartgame(){
  //   this.startgame = new startGame();
  //   this.gameplay.addChild(this.startgame);
  // }
  
     

    _initBackground() {
      this.background = new Background();
      this.background.x = 0;
      this.background.y = 0;
      this.gameplay.addChild(this.background);
    }
  
    _initBoard() {
      this.board = new Board(this.collideManager);
      this.board.x = GameConstant.BOARD_X_POSITION;
      this.board.y = GameConstant.BOARD_Y_POSITION;
      this.gameplay.addChild(this.board);
      this.board.on("collider", ()=>{
        this.knifehitboard.play();
      });
      this.board.zIndex = 100;
    }
  
    _initKnifeManager() {
      this.knifeManager = new KnifeManager(this.collideManager, this.board);
      this.knifeManager.x = 0;
      this.knifeManager.y = 0;
      this.gameplay.addChild(this.knifeManager);
      this.board.on("knife" , ()=>{
        this.board.breakUp();
        this.boardBroken.play(); 
      });
      this.knifeManager.zIndex = 0;
      
    }
    _initObstacle() {
      this.avaiAngle = [];
      for (let i = 0; i < 18; i++) {
        this.avaiAngle[i] = {
          angle: i * 20,
          available: true,
        };
      }
   
      this._initAppleManager();
      this.appleManager._spawnApples(this.avaiAngle);
    }
  
    _initAppleManager() {
        this.appleManager = new AppleManager(this.board.boardSprite, this.collideManager);
        this.appleManager.x = GameConstant.BOARD_X_POSITION + (this.board.width / 2) - (this.appleManager.width / 2) ;
        this.appleManager.y = GameConstant.BOARD_Y_POSITION + (this.board.height / 2) - (this.appleManager.height / 2) ;
        this.gameplay.addChild(this.appleManager);
        this.appleManager.zIndex = 101;
      
    
    }
    _initVictory(){
      this.victory = new Sprite(Texture.from("victory"));
      this.victory.width = GameConstant.GAME_WIDTH;
      this.victory.height = GameConstant.GAME_HEIGHT;
      this.gameplay.addChild(this.victory);
    }
    _initSound() {
      let soundknife = Assets.get("knife_hit_knife");
      this.knifex2 = Sound.from(soundknife);
      let soundboard = Assets.get("knife_hit_wood");
      this.knifehitboard = Sound.from(soundboard);
      let sound = Assets.get("brokenBoard");
      this.boardBroken = Sound.from(sound);
    }
    update(dt){
      this.currentDt += dt;
      TWEEN.update(this.currentDt);
      this.collideManager.update();
      this.knifeManager.update(dt);
      this.appleManager.update(dt);
      this.board.update(dt);
    }
}