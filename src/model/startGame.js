import { Container, Sprite, Text, Texture, utils } from "pixi.js";
import { GameConstant } from "../gameConstant";


export default class StartGame extends Container {
  constructor() {
    super();
    let background = new Sprite(Texture.from("background"));
    this.background = background;
    this.addChild(this.background);

    let knifeSG = new Sprite(Texture.from("knife"));
    this.knifeSG = knifeSG;
    this.knifeSG.x = (GameConstant.GAME_WIDTH - knifeSG.width) / 2;
    this.knifeSG.y = GameConstant.knife_y;
    this.knifeSG.width = GameConstant.knife_width;
    this.knifeSG.height = GameConstant.knife_height;
    this.addChild(this.knifeSG);

        const bgButton = new Sprite(Texture.from("bgButton"));
        bgButton.x = GameConstant.bgButton_x;
        bgButton.y = GameConstant.bgButton_y;
        bgButton.width = GameConstant.bgButton_width;
        bgButton.height = GameConstant.bgButton_height;
        this.addChild(bgButton);
       
        const playText = new Text("PLAY", { fill: "white" });
        playText.x  =  GameConstant.playtext_x;
        playText.y = GameConstant.playtext_y;
        playText.width = 120;
        playText.height = 80;
        this.addChild(playText);

        const knifeText = new Text("KNIFE", { fill: "orange" });
        knifeText.x = GameConstant.knifetext_x;
        knifeText.y = GameConstant.knifetext_y;
        knifeText.width = GameConstant.knifeText_width;
        knifeText.height = GameConstant.knifeText_height;
        this.addChild(knifeText);
        
        const hitText = new Text("HIT", { fill: "orange" });
        hitText.x = GameConstant.hitText_x;
        hitText.y = GameConstant.hitText_y;
        hitText.width = GameConstant.hitText_width;
        hitText.height = GameConstant.hitText_height;
        this.addChild(hitText);

        bgButton.interactive = true; 
        bgButton.buttonMode = true;  
        bgButton.on("click", this.handleButtonClick); 

    }
   handleButtonClick(){
        console.log("123");
       
    }
}

