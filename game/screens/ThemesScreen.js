import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ThemesScreen extends Component {
    static navigationOptions = {
        title: 'ThemesScreen',
        header: null,
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={StyleSheet.flatten([styles.container, { backgroundColor: this.props.navigation.getParam('color', 'dodgerblue') }])}>
                <StatusBar hidden={true} />
                <TouchableOpacity style={StyleSheet.flatten([styles.bStyle, { backgroundColor: 'dodgerblue' }])} onPress={() => {
                    AsyncStorage.setItem('option', 'dodgerblue');
                    navigate('StartGameScreen', { color: 'dodgerblue' });
                }}>
                    <Text>Dodgerblue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={StyleSheet.flatten([styles.bStyle, { backgroundColor: 'white' }])} onPress={() => {
                    AsyncStorage.setItem('option', 'white');
                    navigate('StartGameScreen', { color: 'white' });
                }}>
                    <Text>Simple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={StyleSheet.flatten([styles.bStyle, { backgroundColor: 'grey' }])} onPress={() => {
                    AsyncStorage.setItem('option', 'grey');
                    navigate('StartGameScreen', { color: 'grey' });
                }}>
                    <Text>Grey</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
});