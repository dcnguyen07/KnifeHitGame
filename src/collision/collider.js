export const ColliderEvent = Object.freeze({
    Colliding: "collider:colliding",
    NeedRemove: "collider: needremove"
});
export default class Collider extends EventEmitter {
    constructor(type, x, y){
        super();
        this.type = type;
        this.x = x;
        this.y = y;
        this.id = Date.now();
    }
    checkCollision(objectToCheck){
        throw new Error("Must override checkCollision");
    }
}