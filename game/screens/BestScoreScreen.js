import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, StatusBar } from 'react-native';

export default class BestScoreScreen extends Component {
    static navigationOptions = {
        title: 'BestScoreScreen',
        header: null,
    };

    componentDidMount() {
        AsyncStorage.getItem('test').then((value) => {
            this.setState({ "score": value });
        })
        AsyncStorage.getItem('test2').then((value) => {
            this.setState({ "scoreHard": value });
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            scoreHard: 0
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={StyleSheet.flatten([styles.container, { backgroundColor: this.props.navigation.getParam('color', 'dodgerblue') }])}>
                <StatusBar hidden={true} />
                <View style={styles.nameTag}>
                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>Easy Mode: {this.state.score}</Text>
                </View>
                <View style={styles.nameTag}>
                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>Hard Mode: {this.state.scoreHard}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        //margin:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});