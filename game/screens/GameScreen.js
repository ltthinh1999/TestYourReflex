import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, AsyncStorage } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Obj from '../components/Obj';
import Wall from '../components/Wall';
import Constants from '../components/Constants';
import Physics from '../components/Physics';

export default class GameScreen extends Component {
    static navigationOptions = {
        title: 'GameScreen',
        header: null,
    };

    componentDidMount() {
        AsyncStorage.getItem('test').then((value) => {
            this.setState({ "score": value });
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            running: true,
            score: 0,
        };

        this.gameEngine = null;

        this.entities = this.setupWorld();
    }

    setupWorld = () => {
        let engine = Matter.Engine.create();
        let world = engine.world;
        let score = 0;

        let obj = Matter.Bodies.rectangle(-25, 100, 60, 60);
        Matter.Body.setVelocity(obj, { x: 5, y: 5 })
        let floor = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT + 50, Constants.MAX_WIDTH, 50, { isStatic: true });

        Matter.World.add(world, [obj, floor]);
        world.gravity.y = 0.1;

        Matter.Events.on(engine, 'collisionStart', (event) => {
            this.gameEngine.dispatch({ type: "game-over" });
        });

        return {
            obj: { body: obj, size: [60, 60], renderer: Obj },
            floor: { body: floor, size: [Constants.MAX_WIDTH, 50], color: "grey", renderer: Wall },
            physics: { engine: engine, world: world },
            score: score,
        }
    }

    onEvent = (e) => {
        if (e.type === "game-over") {
            if(this.state.score < this.entities.score){
                AsyncStorage.setItem('test', this.entities.score.toString())
            }
            this.setState({
                running: false
            });
        }
    }

    reset = () => {
        this.entities = this.setupWorld();
        this.gameEngine.swap(this.entities);
        this.setState({
            running: true
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image source={require('../themes/background.jpg')} style={styles.backgroundImage} resizeMode="stretch"></Image>
                <GameEngine
                    ref={(ref) => { this.gameEngine = ref; }}
                    style={styles.gameContainer}
                    running={this.state.running}
                    onEvent={this.onEvent}
                    systems={[Physics]}
                    entities={this.entities}>
                    <StatusBar hidden={true} />
                </GameEngine>
                {!this.state.running && <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
                    <View style={styles.fullScreen}>
                        <Text style={styles.gameOverText}>Game Over</Text>
                        <Text style={styles.gameOverText}>Scores: {this.entities.score}</Text>
                    </View>
                </TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
    },
    gameOverText: {
        color: 'white',
        fontSize: 48
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullScreenButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    }
});