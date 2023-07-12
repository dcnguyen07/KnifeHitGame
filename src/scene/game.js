import { Application, Assets } from "pixi.js";

import { PlayScene } from "./playScene";
import { manifest } from "../manifest";
import { GameConstant } from "../gameConstant";

export class Game {
  static init() {
    this.app = new Application({
      width: GameConstant.GAME_WIDTH,
      height: GameConstant.GAME_HEIGHT,
      backgroundColor: 0x1099bb,
    });
    document.body.appendChild(this.app.view);
    this._loadGameAssets()
      .then((bundle) => {
        this.bundle = bundle;
        this._initScene();
        this.app.ticker.add(this.update, this);
      })
      .catch((error) => {
        console.error("Failed to load game assets:", error);
      });

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  static async _loadGameAssets() {
    await Assets.init({ manifest: manifest });
    return await Assets.loadBundle("gameBundle");                        
  }

  
  
  static _initScene() {
    this.playScene = new PlayScene();
    this.app.stage.addChild(this.playScene);
  }
  static update(dt){
   this.playScene.update(dt);
  }
  static resize() {
    const screenWidth =
      Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      ) || GameConstant.GAME_WIDTH;
    const screenHeight =
      Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ) || GameConstant.GAME_HEIGHT;

    const scale = Math.min(
      screenWidth / GameConstant.GAME_WIDTH,
      screenHeight / GameConstant.GAME_HEIGHT
    );

    const enlargedWidth = Math.floor(scale * GameConstant.GAME_WIDTH);
    const enlargedHeight = Math.floor(scale * GameConstant.GAME_HEIGHT);

    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;

    this.app.view.style.width = `${enlargedWidth}px`;
    this.app.view.style.height = `${enlargedHeight}px`;
    this.app.view.style.marginLeft = this.app.view.style.marginRight = `${horizontalMargin}px`;
    this.app.view.style.marginTop = this.app.view.style.marginBottom = `${verticalMargin}px`;
  }
}

