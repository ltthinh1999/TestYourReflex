import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, AsyncStorage } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Obj from '../components/Obj';
import Obj2 from '../components/Obj2';
import Constants from '../components/Constants2';
import Physics2Players from '../components/Physics2Players';
import { ScreenOrientation } from 'expo';

export default class GameScreen extends Component {
    static navigationOptions = {
        title: 'GameScreen',
        header: null,
    };

    componentDidMount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    componentWillUnmount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    constructor(props) {
        super(props);

        this.state = {
            running: true,
            aWin: false,
            bWin: false
        };

        this.gameEngine = null;

        this.entities = this.setupWorld();
    }

    setupWorld = () => {
        let engine = Matter.Engine.create();
        let world = engine.world;
        let aScore = 0;
        let bScore = 0;

        let obj = Matter.Bodies.rectangle(-25, 100, 60, 60);
        Matter.Body.setVelocity(obj, { x: 5, y: 5 });
        let obj2 = Matter.Bodies.rectangle(Constants.MAX_WIDTH + 25, 100, 60, 60);
        Matter.Body.setVelocity(obj2, { x: -5, y: 5 });
        let floor = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT + 50, Constants.MAX_WIDTH, 50, { isStatic: true });

        Matter.World.add(world, [obj, obj2, floor]);
        world.gravity.y = 0.05;

        Matter.Events.on(engine, 'collisionStart', (event) => {
            var pairs = event.pairs;
            pairs.every(({ bodyA, bodyB }) => {
                if (bodyA === obj2 && bodyB === floor) {
                    this.setState({aWin: true});
                    this.gameEngine.dispatch({ type: "game-over" });
                    return false;
                }
                if (bodyA === obj && bodyB === floor) {
                    this.setState({bWin: true});
                    this.gameEngine.dispatch({ type: "game-over" });
                    return false;
                }
                return true;
            })
        });

        return {
            obj: { body: obj, size: [60, 60], renderer: Obj },
            obj2: { body: obj2, size: [60, 60], renderer: Obj2 },
            physics: { engine: engine, world: world },
            aScore: aScore,
            bScore: bScore
        }
    }

    onEvent = (e) => {
        if (e.type === "game-over") {
            this.setState({
                running: false
            });
        }
    }

    reset = () => {
        this.entities = this.setupWorld();
        this.gameEngine.swap(this.entities);
        this.setState({
            running: true,
            aWin: false,
            bWin: false
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
                    systems={[Physics2Players]}
                    entities={this.entities}>
                    <StatusBar hidden={true} />
                </GameEngine>
                {!this.state.running && <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
                    <View style={styles.fullScreen}>
                        <Text style={styles.gameOverText}>{this.entities.aScore}</Text>
                        {this.state.aWin === true && <Text style={styles.gameOverText}>Winner</Text>}
                    </View>
                    <View style={styles.fullScreen}>
                        <Text style={styles.gameOverText}>{this.entities.bScore}</Text>
                        {this.state.bWin === true && <Text style={styles.gameOverText}>Winner</Text>}
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
        flex: 1,
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
        flex: 1,
        flexDirection: "row"
    }
});