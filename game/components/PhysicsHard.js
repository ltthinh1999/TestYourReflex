import Matter from "matter-js";
import Constants from "./Constants"

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let world = entities.physics.world;
    let obj = entities.obj.body;
    let decoy1 = entities.decoy1.body;
    let decoy2 = entities.decoy2.body;
    let decoy3 = entities.decoy3.body;

    touches.filter(t => t.type === "press").forEach(t => {
        if (t.event.pageX > obj.position.x - 45 && t.event.pageX < obj.position.x + 45 &&
            t.event.pageY > obj.position.y - 60 && t.event.pageY < obj.position.y) {
            entities.score++;
            Matter.Body.setVelocity(obj, { x: ((Constants.MAX_WIDTH / 2 - obj.position.x) / Math.abs(Constants.MAX_WIDTH / 2 - obj.position.x)) * 10 * -1, y: -10 })
            Matter.Body.setVelocity(decoy1, { x: ((Constants.MAX_WIDTH / 2 - decoy1.position.x) / Math.abs(Constants.MAX_WIDTH / 2 - decoy1.position.x)) * 20 * -1, y: -10 })
            Matter.Body.setVelocity(decoy2, { x: ((Constants.MAX_WIDTH / 2 - decoy2.position.x) / Math.abs(Constants.MAX_WIDTH / 2 - decoy2.position.x)) * 20 * -1, y: -10 })
            Matter.Body.setVelocity(decoy3, { x: ((Constants.MAX_WIDTH / 2 - decoy3.position.x) / Math.abs(Constants.MAX_WIDTH / 2 - decoy3.position.x)) * 20 * -1, y: -10 })
        }
        else {
            entities.score--;
            Matter.Body.setVelocity(decoy1, { x: ((Constants.MAX_WIDTH / 2 - decoy1.position.x) / Math.abs(Constants.MAX_WIDTH / 2 - decoy1.position.x)) * 20 * -1, y: -10 })
            Matter.Body.setVelocity(decoy2, { x: ((Constants.MAX_WIDTH / 2 - decoy2.position.x) / Math.abs(Constants.MAX_WIDTH / 2 - decoy2.position.x)) * 20 * -1, y: -10 })
            Matter.Body.setVelocity(decoy3, { x: ((Constants.MAX_WIDTH / 2 - decoy3.position.x) / Math.abs(Constants.MAX_WIDTH / 2 - decoy3.position.x)) * 20 * -1, y: -10 })
        }
    });
    if ((obj.position.x < -25 || obj.position.x > Constants.MAX_WIDTH + 25 || obj.position.y < -25) &&
        (decoy1.position.x < -25 || decoy1.position.x > Constants.MAX_WIDTH + 25 || decoy1.position.y < -25) &&
        (decoy2.position.x < -25 || decoy2.position.x > Constants.MAX_WIDTH + 25 || decoy2.position.y < -25) &&
        (decoy3.position.x < -25 || decoy3.position.x > Constants.MAX_WIDTH + 25 || decoy3.position.y < -25)) {
        let side = Math.floor(Math.random() * 2 + 1);
        if (side === 1) {
            Matter.Body.setPosition(obj, { x: -25, y: Math.floor(Math.random() * Constants.MAX_HEIGHT / 2 + 25) });
            Matter.Body.setVelocity(obj, { x: 5, y: 5 })
            Matter.Body.setPosition(decoy1, { x: -25, y: Math.floor(Math.random() * (Constants.MAX_HEIGHT - 100) + Constants.MAX_HEIGHT / 2) });
            Matter.Body.setVelocity(decoy1, { x: 10, y: 5 })
            Matter.Body.setPosition(decoy2, { x: Constants.MAX_WIDTH + 25, y: Math.floor(Math.random() * Constants.MAX_HEIGHT / 2 + 25) });
            Matter.Body.setVelocity(decoy2, { x: -10, y: 5 })
            Matter.Body.setPosition(decoy3, { x: Constants.MAX_WIDTH + 25, y: Math.floor(Math.random() * (Constants.MAX_HEIGHT - 100) + Constants.MAX_HEIGHT / 2) });
            Matter.Body.setVelocity(decoy3, { x: -10, y: 5 })
        }
        else {
            Matter.Body.setPosition(obj, { x: Constants.MAX_WIDTH + 25, y: Math.floor(Math.random() * Constants.MAX_HEIGHT / 2 + 25) });
            Matter.Body.setVelocity(obj, { x: -5, y: 5 })
            Matter.Body.setPosition(decoy1, { x: -25, y: Math.floor(Math.random() * Constants.MAX_HEIGHT / 2 + 25) });
            Matter.Body.setVelocity(decoy1, { x: 10, y: 5 })
            Matter.Body.setPosition(decoy2, { x: -25, y: Math.floor(Math.random() * (Constants.MAX_HEIGHT - 100) + Constants.MAX_HEIGHT / 2) });
            Matter.Body.setVelocity(decoy2, { x: 10, y: 5 })
            Matter.Body.setPosition(decoy3, { x: Constants.MAX_WIDTH + 25, y: Math.floor(Math.random() * (Constants.MAX_HEIGHT - 100) + Constants.MAX_HEIGHT / 2) });
            Matter.Body.setVelocity(decoy3, { x: -10, y: 5 })
        }
    }

    Matter.Engine.update(engine, time.delta);

    return entities;
};

export default Physics;