import Matter from "matter-js";
import Constants from "./Constants"

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let world = entities.physics.world;
    let obj = entities.obj.body;

    touches.filter(t => t.type === "press").forEach(t => {
        if (t.event.pageX > obj.position.x - 45 && t.event.pageX < obj.position.x + 45 &&
            t.event.pageY > obj.position.y - 60 && t.event.pageY < obj.position.y) {
            entities.score++;
            if (obj.position.x < Constants.MAX_WIDTH / 2) {
                Matter.Body.setVelocity(obj, { x: 10, y: -10 })
            }
            else {
                Matter.Body.setVelocity(obj, { x: -10, y: -10 })
            }
        }
        else{
            entities.score--;
        }
    });
    if (obj.position.x < -25 || obj.position.x > Constants.MAX_WIDTH + 25) {
        let side = Math.floor(Math.random() * 2 + 1);
        if (side === 1) {
            Matter.Body.setPosition(obj, { x: -25, y: Math.floor(Math.random() * Constants.MAX_HEIGHT / 2 + 25) });
            Matter.Body.setVelocity(obj, { x: 5, y: 5 })
        }
        else {
            Matter.Body.setPosition(obj, { x: Constants.MAX_WIDTH + 25, y: Math.floor(Math.random() * Constants.MAX_HEIGHT / 2 + 25) });
            Matter.Body.setVelocity(obj, { x: -5, y: 5 })
        }
    }

    Matter.Engine.update(engine, time.delta);

    return entities;
};

export default Physics;