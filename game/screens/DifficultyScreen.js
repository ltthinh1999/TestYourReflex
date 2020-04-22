import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

export default class LosingScreen extends Component {
    static navigationOptions = {
        title: 'Choose difficulty',
        header: null,
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={StyleSheet.flatten([styles.container, { backgroundColor: this.props.navigation.getParam('color', 'dodgerblue') }])}>
                <StatusBar hidden={true} />
                <TouchableOpacity
                    style={styles.bStyle}
                    onPress={() => navigate('GameScreen')}>
                    <Text>Easy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.bStyle}
                    onPress={() => navigate('GameScreenHard')}>
                    <Text>Hard</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bStyle: {
        alignItems: 'center',
        padding: 10,
        margin: 10,
        width: 200,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    }


});