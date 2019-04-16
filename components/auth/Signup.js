// Signup.js

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { Icon, Container, Content, Thumbnail, Header, Body, Left, Item, Button, Right } from "native-base";

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
            name: text,
            errors: []
        })
    }
    signup() {
        const name = this._name._lastNativeText
        const email = this._email._lastNativeText
        const password = this._password._lastNativeText
        console.log('====================================');
        console.log(name, email, password);
        console.log('====================================');
        try {
            fetch('http://10.0.2.2/project/reactapi/public/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password,
                })
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.errors) {
                        alert(res.message)
                        this.setState({
                            errors: res.errors
                        })
                        console.log(res)
                        return
                    }
                    console.log(res);
                    alert(res.message)
                    this.setState({
                        token: res.access_token
                    })
                    console.log(res);
                    // console.log(this.state.token)

                }).done()
        } catch (error) {
            console.log('====================================');
            console.log('error');
            console.log('====================================');
        }

    }
    user = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            // let user = await AsyncStorage.getItem('user');
            // let parsed = JSON.parse(user);
            if (user == 'true') {
                alert('true')
            }
            // alert('false')
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
                    <Item rounded>
                        <TextInput placeholder="Username" keyboardType="email-address"
                            style={{ width: 100 + '%', height: null }}
                            ref={input => this._name = input} />
                    </Item>

                    <Item rounded style={{ marginTop: 10 }}>
                        <TextInput placeholder="Email" keyboardType="email-address"
                            style={{ width: 100 + '%', height: null }}
                            ref={input => this._email = input} />
                    </Item>

                    <Item rounded style={{ marginTop: 10 }}>
                        <TextInput placeholder="Password" style={{ width: 100 + '%', height: null }}
                            ref={input => this._password = input}
                            secureTextEntry={true} />
                    </Item>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Left>
                            <Button rounded onPress={this.signup} success style={{ paddingHorizontal: 30, marginTop: 10 }}>
                                <Text style={{ color: '#fff' }}>Signup</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button rounded onPress={this.user} info style={{ paddingHorizontal: 30, marginTop: 10 }}>
                                <Text style={{ color: '#fff' }}>User</Text>
                            </Button>
                        </Right>
                    </View>
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
        backgroundColor: '#f0f0f0',
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
        // justifyContent: 'center',
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
        fontSize: 25,
        fontWeight: 'bold',
    }
});

export default Signup;