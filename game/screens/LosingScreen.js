import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class LosingScreen extends Component {
    static navigationOptions = {
        title: 'LosingScreen',
        header: null,
    };
    render() {
        const { navigate } = this.props.navigation;
        let score = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text>You lost</Text>
                <Text>Play again?</Text>
                <View style={styles.scontainer}>
                    <TouchableOpacity
                        style={styles.sbStyle}
                        onPress={() => navigate('LoginScreen')}>
                        <Text>Retry</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.sbStyle}
                        onPress={() => navigate('SignupScreen')}>
                        <Text>Home</Text>
                    </TouchableOpacity>
                </View>
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

    scontainer: {
        flexDirection: 'row',
    },

    sbStyle: {
        alignItems: 'center',
        padding: 10,
        margin: 10,
        width: 100,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
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