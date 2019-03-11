// Login.js

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { Icon, Container, Content, Thumbnail, Header, Body, Left, Right, Button } from "native-base";

export class Login extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-log-in" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this)
        this.login = this.login.bind(this)
    }
    handleTextChange(text) {
        this.setState({
            name: text
        })
    }
    login = async () => {

        try {
            const email = this._email._lastNativeText
            const password = this._password._lastNativeText
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            // return parsed
            // let user_email = parsed.email
            // console.log(parsed.email, parsed.password);
            // console.log(email, password);

            if (email == parsed.email && password == parsed.password) {
                AsyncStorage.setItem('login', 'true');
                alert('correct')
            } else {
                alert('Wrong username or password')
            }
            // console.log(password);

            // console.log(parsed.email);

        } catch (error) {
            console.log(error);

        }

        // let user_email = user.email
        // console.log(user_email);
    }

    user = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            // return parsed
            // let user_email = parsed.email

            // console.log(parsed.email);

        } catch (error) {
            console.log(error);

        }
    }
    render() {
        return (
            <View style={styles.login}>
                {/* <ImageBackground source={require('../../images/bottle.jpg')} style={{ width: '100%', height: '100%' }}> */}
                <View style={styles.header}>
                    <Text style={styles.label}>Login</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', color: '#000', borderBottomWidth: 1 }}
                        keyboardType="email-address"
                        ref={input => this._email = input}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', color: '#000', borderBottomWidth: 1, marginBottom: 20 }}
                        ref={input => this._password = input}
                        secureTextEntry={true} />
                    <Button onPress={this.login} transparent><Text>Login</Text></Button>

                </View>
                {/* <View style={styles.Loginbutton}>
                </View> */}
                {/* </ImageBackground> */}

            </View>
        )
    }
};

const styles = StyleSheet.create({
    login: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',

    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
    },
    form: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#f0f0f0',
        padding: 20,
    },
    Loginbutton: {
        // marginTop: 10,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#000',
    }
});

export default Login;