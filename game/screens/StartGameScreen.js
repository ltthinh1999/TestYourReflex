import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, StatusBar, Image, Dimensions } from 'react-native';

export default class StartGameScreen extends Component {
    static navigationOptions = {
        title: 'TestYourReflex',
        header: null,
    };

    componentDidMount() {
        AsyncStorage.getItem('option').then((value) => {
            this.setState({ "myOpt": value });
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            myOpt: 'dodgerblue',
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        var par = this.props.navigation.getParam('color', this.state.myOpt);
        if (!this.props.navigation.getParam('user'))
            return (
                <View style={StyleSheet.flatten([styles.container, { backgroundColor: this.props.navigation.getParam('color', this.state.myOpt) }])}>
                    <StatusBar hidden={true} />
                    <View style={styles.nameTag}>
                        <Text style={{ color: 'white', fontSize: 55, fontWeight: "500", textShadowColor: 'black', textShadowRadius: 20, flex: 1 }}></Text>
                        <Text style={{ color: 'white', fontSize: 55, fontWeight: "500", textShadowColor: 'black', textShadowRadius: 20, flex: 1 }}>TestYourReflex</Text>
                        <View style={{ flexDirection: "row-reverse" }}>
                            <Image
                                source={require('../objects/ball3.png')}
                                style={{
                                    width: 60,
                                    height: 60,
                                }}
                                resizeMode="repeat"></Image>
                            <Image
                                source={require('../objects/ball4.png')}
                                style={{
                                    width: 60,
                                    height: 60,
                                }}
                                resizeMode="repeat"></Image>
                        </View>
                    </View>
                    <View style={styles.container1}>
                        <TouchableOpacity
                            style={styles.bStyle}
                            onPress={() => navigate('ModeScreen', { color: par })}>
                            <Text>Play</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.bStyle}
                            onPress={() => navigate('BestScoreScreen', { color: par })}>
                            <Text>Leaderboard</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.bStyle}
                            onPress={() => navigate('ThemesScreen', { color: par })}>
                            <Text>Themes</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container2}>
                        <TouchableOpacity
                            style={styles.sbStyle}
                            onPress={() => navigate('LoginScreen', { color: par })}>
                            <Text>Log in</Text>
                        </TouchableOpacity>
                        <Text> | </Text>
                        <TouchableOpacity
                            style={styles.sbStyle}
                            onPress={() => navigate('SignupScreen', { color: par })}>
                            <Text>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        else
            return (
                <View style={StyleSheet.flatten([styles.container, { backgroundColor: this.props.navigation.getParam('color', this.state.myOpt) }])}>
                    <StatusBar hidden={true} />
                    <View style={styles.nameTag}>
                        <Text style={{ color: 'white', fontSize: 55, fontWeight: "500", textShadowColor: 'black', textShadowRadius: 20, flex: 1 }}></Text>
                        <Text style={{ color: 'white', fontSize: 55, fontWeight: "500", textShadowColor: 'black', textShadowRadius: 20, flex: 1 }}>TestYourReflex</Text>
                        <View style={{ flexDirection: "row-reverse" }}>
                            <Image
                                source={require('../objects/ball3.png')}
                                style={{
                                    width: 60,
                                    height: 60,
                                }}
                                resizeMode="repeat"></Image>
                            <Image
                                source={require('../objects/ball4.png')}
                                style={{
                                    width: 60,
                                    height: 60,
                                }}
                                resizeMode="repeat"></Image>
                        </View>
                    </View>
                    <View style={styles.container1}>
                        <TouchableOpacity
                            style={styles.bStyle}
                            onPress={() => navigate('ModeScreen', { color: par })}>
                            <Text>Play</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.bStyle}
                            onPress={() => navigate('BestScoreScreen', { color: par })}>
                            <Text>Leaderboard</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.bStyle}
                            onPress={() => navigate('ThemesScreen', { color: par })}>
                            <Text>Themes</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container2}>
                        <TouchableOpacity
                            style={styles.sbStyle}>
                            <Text>{this.props.navigation.getParam('user')}</Text>
                        </TouchableOpacity>
                        <Text> | </Text>
                        <TouchableOpacity
                            style={styles.sbStyle}
                            onPress={() => navigate('StartGameScreen', { color: par, user: false })}>
                            <Text>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center',
    },

    nameTag: {
        flex: 6,
        //backgroundColor: 'dodgerblue',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container1: {
        //backgroundColor: 'dodgerblue',
        flex: 11,
    },

    container2: {
        //backgroundColor: 'dodgerblue',
        flex: 1,
        flexDirection: 'row',
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
    },

    sbStyle: {
        alignItems: 'center',
    }
});