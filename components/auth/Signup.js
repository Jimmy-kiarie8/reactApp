// Signup.js

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { Icon, Container, Content, Thumbnail, Header, Body, Left, Right, Button } from "native-base";

export class Signup extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-log-in" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this)
        this.signup = this.signup.bind(this)
    }
    handleTextChange(text) {
        this.setState({
            name: text
        })
    }
    signup() {
        const name = this._name._lastNativeText
        const email = this._email._lastNativeText
        const password = this._password._lastNativeText
        let obj = {
            name: name,
            email: email,
            password: password,
        }
        // console.log(name, email, password);
        AsyncStorage.setItem('user', JSON.stringify(obj));
        console.log(obj);

    }
    user = async () => {
        try {
            let user = await AsyncStorage.getItem('login');
            // let user = await AsyncStorage.getItem('user');
            // let parsed = JSON.parse(user);
            if (user == 'true') {
                alert('true')
            }
            console.log(user);

        } catch (error) {
            console.log(error);

        }
    }
    render() {
        return (
            <View style={styles.signup}>
                {/* <ImageBackground source={require('../../images/bottle.jpg')} style={{ width: '100%', height: '100%' }}> */}
                <View style={styles.header}>
                    <Text style={styles.label}>Signup</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', color: '#000', borderBottomWidth: 1 }}
                        keyboardType="email-address"
                        ref={input => this._email = input}
                    />

                    <Text style={styles.label}>Name</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', color: '#000', borderBottomWidth: 1 }}
                        ref={input => this._name = input}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', color: '#000', borderBottomWidth: 1, marginBottom: 20 }}
                        ref={input => this._password = input}
                        secureTextEntry={true} />
                    <Button onPress={this.signup} transparent><Text>Signup</Text></Button>
                    <Button onPress={this.user} transparent><Text>Users</Text></Button>

                </View>
                {/* <View style={styles.Loginbutton}>
                </View> */}
                {/* </ImageBackground> */}

            </View>
        )
    }
};

const styles = StyleSheet.create({
    signup: {
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

export default Signup;