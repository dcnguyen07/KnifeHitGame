import { EventEmitter } from "@pixi/utils";
export const CollisionManagerEvent = Object.freeze({
    Colliding: "collisionmanager:colliding"
})
export const ColliderType = Object.freeze({
    Static: 'static',
    Dynamic: 'dynamic'
})
export default class CollisionManager extends EventEmitter {
constructor(){
    super();
    this.listColliders = {
        static:[],
        dynamic:[],
    };
}
add(collider, type = ColliderType.Static){
    if(!this.listCollider[type])
    this.listColliders[type]= [];
    this.listColliders[type].push(collider);
}
remove(collider){
    collider = collider.collider
    for (const key in this.listColliders){
        if(this.listColliders[key].includes(collider)){
            let index = this.listColliders[key].indexOf(collider);
            this.listColliders[key].splice(index, 1);
        }
    }
}
update(){
    this.listColliders.static.forEach((staticCollider)=> {
        this.listColliders.dynamic.forEach(dynamicCollider => {
            if(staticCollider.checkCollision(dynamicCollider)){
                this.emit(CollisionManagerEvent.Colliding, staticCollider, dynamicCollider)
            }
        })
    })
    }
}