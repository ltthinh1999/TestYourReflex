import Matter from "matter-js";
import Constants from "./Constants2"

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let obj = entities.obj.body;
    let obj2 = entities.obj2.body;

    touches.filter(t => t.type === "press").forEach(t => {
        if (t.event.pageX > obj.position.x - 45 && t.event.pageX < obj.position.x + 45 &&
            t.event.pageY > obj.position.y - 60 && t.event.pageY < obj.position.y) {
            entities.aScore++;
            Matter.Body.setVelocity(obj, { x: -10, y: -10 })
        }
        else if(t.event.pageX < Constants.MAX_WIDTH / 2) {
            entities.aScore--;
        }

        if (t.event.pageX > obj2.position.x - 45 && t.event.pageX < obj2.position.x + 45 &&
            t.event.pageY > obj2.position.y - 60 && t.event.pageY < obj2.position.y) {
            entities.bScore++;
            Matter.Body.setVelocity(obj2, { x: 10, y: -10 })
        }
        else if (t.event.pageX > Constants.MAX_WIDTH / 2) {
            entities.bScore--;
        }
    });
    if (obj.position.x < -25) {
        Matter.Body.setPosition(obj, { x: -25, y: Math.floor(Math.random() * Constants.MAX_HEIGHT / 2 + 25) });
        Matter.Body.setVelocity(obj, { x: 5, y: 5 })
    }
    if (obj2.position.x > Constants.MAX_WIDTH + 25) {
        Matter.Body.setPosition(obj2, { x: Constants.MAX_WIDTH + 25, y: Math.floor(Math.random() * Constants.MAX_HEIGHT / 2 + 25) });
        Matter.Body.setVelocity(obj2, { x: -5, y: 5 })
    }

    Matter.Engine.update(engine, time.delta);

    return entities;
};

export default Physics;