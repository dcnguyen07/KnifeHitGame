import { Container  } from "pixi.js";
import { Board } from "../model/board";
import { KnifeManager } from "../model/knifeManager";
import { Background } from "../model/background";
import { GameConstant } from "../gameConstant";
import startGame from "../model/startGame";
import { AppleManager } from "../model/appleManager";
import * as TWEEN from "@tweenjs/tween.js";
import { Util } from "../utils/utils";
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
      this._initBackground();
      this._initBoard(); 
      this._initKnifeManager();
      this._initObstacle();
    
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
      this.board = new Board();
      this.board.x = GameConstant.BOARD_X_POSITION;
      this.board.y = GameConstant.BOARD_Y_POSITION;
      this.gameplay.addChild(this.board);
      this.board.zIndex = 100;
    }
  
    _initKnifeManager() {
      this.knifeManager = new KnifeManager();
      this.knifeManager.x = 0;
      this.knifeManager.y = 0;
      this.gameplay.addChild(this.knifeManager);
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
      this.knifeManager.createObsKnifes(this.avaiAngle);
      this._initAppleManager();
      this.appleManager._spawnApples(this.avaiAngle);
   
    }
  
    _initAppleManager() {
      this.appleManager = new AppleManager(this.board.boardSprite);
      this.appleManager.x = 0;
      this.appleManager.y = 0;
      this.gameplay.addChild(this.appleManager);
      this.appleManager.zIndex = 100;
    }
    
    update(dt){
      this.currentDt += dt;
      TWEEN.update(this.currentDt);
      this.knifeManager.update(dt);
      this.appleManager.update(dt);
      this.board.update(dt);
      this._onCollision();
      this._syncRotate();
    }
_onCollision() {
    if (this.knifeManager.knifes[0] != null) {
      if (this.knifeManager.knifes[0].state === "move") {
        if (this.knifeManager.knifes[0].y >= 610) {
            this.knifeManager.obsKnifes.forEach((knife) => {
                if (Util.SATPolygonPolygon(this._cal4PointKnife(this.knifeManager.knifes[0]), Util.find4Vertex(knife))) {
                  this.knifeManager.knifes[0].setFall();
                  
                }
              });
        }
        this.appleManager.apples.forEach((apple) => {
          if (Util.SATPolygonPolygon(this._cal4PointKnife(this.knifeManager.knifes[0]), Util.find4Vertex(apple))) {
          }
        });
        if (Util.AABBCheck(this.knifeManager.knifes[0].collider, this.board.collider)) {
          this.board.onHit();
          this.knifeManager.onBoardHit();
          this.appleManager.onBoardHit();
          this.knifeManager.knifes[0].beObs();
          this._rotateKnife(this.knifeManager.knifes[0]);
          this.knifeManager.obsKnifes.push(this.knifeManager.knifes.shift());
          if (this.knifeManager.numOfKnife > 0) {
            this.knifeManager.knifes[0].setActivate();
          }
          this.knifeManager.numOfKnife--;
          if (this.knifeNumber === 0) {
          
          }
        }
      }
    }
  }
  _rotateKnife(knife) {
    knife.x = this.board.x;
    knife.y = this.board.y;
    knife.anchor.set(0.5, -0.5);
    knife.collider.anchor.set(0.5, -0.5);
  }

  _syncRotate() {
    this.knifeManager.boardAngleRotation = this.board.angleRotation;
    this.appleManager.boardAngleRotation = this.board.angleRotation;
  }
  
  _cal4PointKnife(knife) {
    let w = knife.collider.getBounds().width;
    let h = knife.collider.getBounds().height;
    let x = knife.collider.getBounds().x;
    let y = knife.collider.getBounds().y;
    return [x, y, x + w, y, x + w, y + h, x, y + h];
  }

}