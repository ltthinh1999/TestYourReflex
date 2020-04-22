import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;
Form.stylesheet.fieldset.width = '100%';
Form.stylesheet.textbox.normal.borderColor = '#d0d2d3';
Form.stylesheet.textbox.normal.backgroundColor = 'white';
Form.stylesheet.textbox.normal.borderWidth = 1;
Form.stylesheet.textbox.normal.width = '100%';

const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});

const Bool = t.subtype(t.Boolean, (bool) => {
    return bool;
});

const User = t.struct({
    email: Email,
    username: t.String,
    password: t.String,
    terms: Bool
});

const options = {
    fields: {
        email: {
            error: 'Without an email address how are you going to reset your password when you forget it?'
        },
        username: {
            error: "So what we gonna call you?"
        },
        password: {
            error: 'Choose something you use on a dozen other sites or something you won\'t remember',
            password: true,
            secureTextEntry: true
        },
        terms: {
            label: 'Agree to Terms',
            error: "Terms aren't agreed",
        },
    },
};


export default class StartGameScreen extends Component {
    static navigationOptions = {
        title: 'TestYourReflex',
        header: null,
    };

    Signup() {
        if (this.refs.input.getValue())
            this.props.navigation.navigate('LoginScreen', { color: this.props.navigation.getParam('color', 'dodgerblue')});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={StyleSheet.flatten([styles.container, { backgroundColor: this.props.navigation.getParam('color', 'dodgerblue') }])}>
                <Form ref='input' type={User} options={options} />
                <View style={styles.row}>
                <TouchableOpacity style={styles.bStyle} onPress={this.Signup.bind(this)}>
                        <Text>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bStyle} onPress={() => this.props.navigation.goBack()}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        height: '100%'
    },

    bStyle: {
        alignItems: 'center',
        padding: 10,
        margin: 10,
        width: 80,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});