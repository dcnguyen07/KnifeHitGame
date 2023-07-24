import { Container, Sprite, Text, TextStyle, Texture } from "pixi.js";
import { Game } from "../../scene/game";
import { GameConstant } from "../../gameConstant";

export class PlayUI extends Container {
   constructor(data, score, appleScore){
    super();
    this.levelData = data;
    this.playTime = 0;
    this.score = score;
    this.appleScore = appleScore;
    this._initLevel();
    this._initScore();
    this._initKnifeCount();
    this._initAppleCount();
    this.resize();
   } 
   _initLevel() {
    let textStyle = new TextStyle({
      fontSize: 45,
      align: "center",
      fill: 0xe6b85f,
      fontWeight: "bold",
    });
    this.levelText = new Text(
      `Level ${this.levelData.currentLevel}`,
      textStyle
    );
    this.levelText = new Text("Level 1", textStyle); 
    this.levelText.anchor.set(0.5, 0);
    this.addChild(this.levelText);
  }
   _initScore(){
    let textStyle = new TextStyle({
        fontSize: 45,
        align: "center",
        fill: 0xffffff,
        fontWeight: "bold",
    });
    this.scoreText = new Text(`${this.score}`, textStyle);
    this.scoreText.anchor.set(0);
    this.addChild(this.scoreText);
   }
   _initKnifeCount(){
    this.knifeIcons = [];
    this.knifeIconsContainer = new Container();
    this.addChild(this.knifeIconsContainer);

    for (let i= 0; i < this.levelData.numOfKnife; i++){
        let knife = new Sprite(Texture.from("knifewhite"));
        knife.y = i * 45;
        this.knifeIcons.push(knife);
        this.knifeIconsContainer.addChild(knife);
    }
   }
   _initAppleCount() {
    this.appleScoreContainer = new Container();
    this.addChild(this.appleScoreContainer);

    let textStyle = new TextStyle({
        fontSize: 40,
        align: "center",
        fill: 0xffffff,
        fontWeight: "bold",
    });
    this.appleText = new Text("0", textStyle); 
    this.appleText.anchor.set(1, 0);
    this.appleText.position.set(20, 10);
    this.appleSprite = Sprite.from(Game.bundle.apple_slice_1);
    this.appleSprite.scale.set(0.8);
    this.appleSprite.position.set(50, 10);
    this.appleScoreContainer.addChild(this.appleText);
    this.appleScoreContainer.addChild(this.appleSprite);
}

   updateScore(score){
    this.scoreText.text = `${score}`;
   }
   updateAppleScore(apple) {
    this.appleText.text = `${apple}`;
}
   updateKnifeIcon(index){
    this.knifeIcons[index] = new Sprite (Texture.from('knifeblack'));
   }
   hide(){
    this.visible = false;
   }
   show(){
    this.visible = true;
   }
   resize(){
    this.levelText.x = GameConstant.GAME_WIDTH / 2;
    this.levelText.y = 10;
    this.scoreText.x = 50;
    this.scoreText.y = 10;
    this.appleScoreContainer.x = GameConstant.GAME_WIDTH - 100;
    this.appleScoreContainer.y = 10;
    this.knifeIconsContainer.x = 30;
    this.knifeIconsContainer.y = 1000 - this.knifeIconsContainer.height;
   }
}