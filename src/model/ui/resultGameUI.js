import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Util } from "../../utils/utils";

export class ResultGameUI extends Container {
  constructor(){
    super();
    this._initDisplay();
    this._initBox();
    this._initMessage();
    this._initButton();
    this.resize();
  }
  _initDisplay(){
    this.display = new Graphics()
    this.display.beginFill(0x000000, 0.5);
    this.display.drawRect(0, 0, GameConstant.GAME_WIDTH, GameConstant.GAME_HEIGHT);
    this.display.endFill();
    this.display.eventMode = "static";
    this.addChild(this.display);
  }
  _initBox(){
    this.box = new Sprite(Texture.from('bgButton'));
    this.box.width = 600;
    this.box.height = 400;
    this.addChild(this.box);
  }
  _initMessage(){
    this.messageText = new Text("You win" ,{
      fontSize: 80,
      fill: "#ADFF2F",
      fontWeight: "bold",
      align: "center",
      fontFamily: "Comic Sans MS",
    });
    this.messageText.zIndex = 100;
    this.addChild(this.messageText);
  }

  _initButton(){
    this.button = new Sprite(Texture.from('bgButton'));
    this.button.width = 200;
    this.button.height = 80;
    this.button.anchor.set(0.5);
    this.button.eventMode = "static";
    this.button.zIndex = 0;
    // Thêm văn bản cho option 1
    this.buttonText = new Text("Next", {
      fontSize: 40,
      fill: "#FFFFFF",
      fontWeight: "bold",
      align: "center",
      fontFamily: "Comic Sans MS",
    });
    this.buttonText.zIndex = 100;
    this.buttonText.anchor.set(0.5);
    this.addChild(this.button);
    this.addChild(this.buttonText);
    Util.registerOnPointerDown(this.button, this._onTapButton, this);
  }

  _onTapButton() {
    this.emit("tapped");
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  resize() {
    this.box.x = GameConstant.GAME_WIDTH - this.box.width - 60;
    this.box.y =
      (GameConstant.GAME_HEIGHT - this.box.height) / 2 - this.box.height / 6;

    this.messageText.x = this.box.width / 2 - this.messageText.width / 3.2;
    this.messageText.y = this.box.y + this.box.y / 4;

   
    this.button.x =
      this.box.x / 2 + this.box.width / 2 + this.button.width - 50;
    this.button.y = this.box.y + this.box.height / 2 + this.button.height + 30;

    this.buttonText.x = this.button.x;
    this.buttonText.y = this.button.y;
  }

  showLoseBox() {
    this.show();
    this.messageText.text = "You lose";
    this.buttonText.text = "Replay";
    this.messageText.style.fill = "red";
    this.button.texture = Game.bundle.bgButton;
  }
}
 
