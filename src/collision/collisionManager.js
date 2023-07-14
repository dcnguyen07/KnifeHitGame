import { EventEmitter } from "@pixi/utils";
import CircleCollider from "./circleCollider";

export const CollisionManagerEvent = Object.freeze({
  Colliding: "collisionmanager:colliding",
});

export const ColliderType = Object.freeze({
  Static: 'static',
  Dynamic: 'dynamic',
});

export default class CollisionManager extends EventEmitter {
  constructor() {
    super();
    this.listColliders = {
      static: [],
      dynamic: [],
    };
  }

  add(collider, type = ColliderType.Static) {
    if (!this.listColliders[type]) {
      this.listColliders[type] = [];
    }
    this.listColliders[type].push(collider);
  }

  remove(collider) {
    collider = collider.collider;
    for (const key in this.listColliders) {
      if (this.listColliders[key].includes(collider)) {
        let index = this.listColliders[key].indexOf(collider);
        this.listColliders[key].splice(index, 1);
      }
    }
  }

  update() {
  
     this.listColliders.static.forEach((staticCollider) => {
      if(!staticCollider.enable){
        return;
      }
      this.listColliders.dynamic.forEach((dynamicCollider) => {
        if(!dynamicCollider.enable){
          return;
        }
        if (staticCollider instanceof CircleCollider) {
          const isCollideCircle = this.isCollideCircle(staticCollider, dynamicCollider);
          if(isCollideCircle){
            staticCollider.emit(CollisionManagerEvent.Colliding, dynamicCollider);
            dynamicCollider.emit(CollisionManagerEvent.Colliding, staticCollider);
          }
          else {
            // const isCollideRect = this.isCollideRect(staticCollider, dynamicCollider);
            // this.emit(CollisionManagerEvent.Colliding, isCollideRect);
          }
    }
      });
    });
  }

  isCollideCircle(circleCollide, rectCollide) {
    let circleBound = circleCollide.getBounds();
    let radius = circleCollide.radius;
    let rectBound = rectCollide.getBounds();

    const closestPointX = Math.max(rectBound.x, Math.min(circleBound.x, rectBound.x + rectBound.width));
    const closestPointY = Math.max(rectBound.y, Math.min(circleBound.y, rectBound.y + rectBound.height));

    const distance = Math.sqrt((rectBound.x - closestPointX) ** 2 + (circleBound.y - closestPointY) ** 2);
    if (distance <= radius) {
      return true;
    } else {
      return false;
    }
  }

  isCollideRect(rect1, rect2) {
    let rect1Bound = rect1.getBounds();
    let rect2Bound = rect2.getBounds();
    const rectCollide1Left = rect1Bound.x;
    const rectCollide1Right = rect1Bound.x + rect1Bound.width;
    const rectCollide1Top = rect1Bound.y;
    const rectCollide1Bottom = rect1Bound.y + rect1Bound.height;

    const rectCollide2Left = rect2Bound.x;
    const rectCollide2Right = rect2Bound.x + rect2Bound.width;
    const rectCollide2Top = rect2Bound.y;
    const rectCollide2Bottom = rect2Bound.y + rect2Bound.height;

    if (
      rectCollide1Left < rectCollide2Right &&
      rectCollide1Right > rectCollide2Left &&
      rectCollide1Top < rectCollide2Bottom &&
      rectCollide1Bottom > rectCollide2Top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
