import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;
Form.stylesheet.fieldset.width = '100%';
Form.stylesheet.fieldset.borderColor = 'black';
Form.stylesheet.textbox.normal.borderColor = '#d0d2d3';
Form.stylesheet.textbox.normal.backgroundColor = 'white';
Form.stylesheet.textbox.normal.borderWidth = 1;
Form.stylesheet.textbox.normal.width = '100%';
Form.stylesheet.textbox.error.backgroundColor = 'white';

const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});
Email.getValidationErrorMessage = (value, path, context) => {
    return 'Invalid email: ' + context.locale;
};

const Password = t.String;
Password.getValidationErrorMessage = (value, path, context) => {
    return 'Invalid password';
};


const User = t.struct({
    email: Email,
    password: Password,
});

const options = {
    fields: {
        password: {
            type: 'password',
            password: true,
            secureTextEntry: true
        },
        email: {
            error: 'Invalid email'
        }
    }
};

export default class StartGameScreen extends Component {
    static navigationOptions = {
        title: 'TestYourReflex',
        header: null,
    };

    Login() {
        if (this.refs.input.getValue())
            this.props.navigation.navigate('StartGameScreen', { color: this.props.navigation.getParam('color', 'dodgerblue'), user: this.refs.input.getValue().email.split('@')[0]});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={StyleSheet.flatten([styles.container, { backgroundColor: this.props.navigation.getParam('color', 'dodgerblue') }])}>
                <Form ref="input" type={User} options={options} />
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={this.Login.bind(this)}>
                        <Text>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
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
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button: {
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
});