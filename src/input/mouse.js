import { utils } from "pixi.js";
export const MouseEvent = Object.freeze({
    MouseClick: "MouseEvent: click"
})

export class Mouse extends utils.EventEmitter{
   static instance;
   static init() {
    this.instance = new Mouse();
   }
   constructor(){
    super();
    this.handle();
   }
   handle(){
    window.addEventListener("click", (e)=> this.clickListener(e), false);
   }
   clickListener(e){
        this.emit(MouseEvent.MouseClick, e)
   }
   unclick(){
    window.removeEventListener("click", this.clickListener);
   }
}