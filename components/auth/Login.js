// Login.js
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import { Icon, Button, Item, Container, Form, Right, Left } from "native-base";
import LoadingScreen from '../screen/Loading'

export class Login extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-log-in" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props);
        this.state = ({
            email: '',
            password: '',
            loading: false,
            token: '',
            errors: [],
            erroShow: [],
            refreshing: false,
        })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getItems()

    }
    loginCheck(email, password) {
        this.setState({ refreshing: true });
        try {
            fetch('http://10.0.2.2/project/reactapi/public/api/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res.errors) {
                        // alert('welcome' + email)
                        this.setState({
                            errors: res.errors
                        })
                        console.log(res)
                        return
                    } else if (res.access_token) {
                        // alert(res.message)
                        this.setState({
                            token: res.access_token,
                        })
                        this.login()
                    } else {
                        // alert(res.message)
                    }
                    // console.log(this.state.token)

                }).done()
        } catch (error) {
            console.log('====================================');
            console.log('error');
            console.log('====================================');
        }
    }
    login = async () => {
        console.log(this.state.token)
        this.setState({
            loading: true
        })
        // this.showScreen()
        this.props.navigation.navigate('LoadingScreen')
        try {
            AsyncStorage.setItem('token', this.state.token);
            AsyncStorage.setItem('login', 'true');
            this.props.navigation.navigate('DraweNavigate')
            this.setState({
                loading: false
            })
        } catch (error) {
            console.log(error);

        }
    }

    user = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
        } catch (error) {
            console.log(error);

        }
    }
    showScreen = () => {
        console.log(this.state.loged_in);
        if (this.state.loading == true) {
            return (<LoadingScreen />)
        } else {
            return (
                <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                <View style={styles.login}>
                    <View style={styles.header}>
                        <Text style={styles.label}>-S09-6041-2015-</Text>
                        <Text style={styles.label}>-Login-</Text>
                    </View>
                    <View style={styles.form}>
                        <Form>
                            <Item rounded>
                                <TextInput placeholder="Email" keyboardType="email-address"
                                    style={{ width: 100 + '%', height: null }}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </Item>

                            <Item rounded style={{ marginTop: 10 }}>
                                <TextInput placeholder="Password" style={{ width: 100 + '%', height: null }}
                                    onChangeText={(password) => this.setState({ password })}
                                    secureTextEntry={true}
                                />
                            </Item>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                                <Left>
                                    <Button rounded
                                        onPress={() => this.loginCheck(this.state.email, this.state.password)}
                                        primary style={{ paddingHorizontal: 30, marginTop: 10 }}>
                                        <Text style={{ color: '#fff' }}>Login</Text>
                                    </Button>
                                </Left>
                                <Right>
                                    <Button rounded
                                        onPress={() => this.props.navigation.navigate('Signup')}
                                        success style={{ paddingHorizontal: 30, marginTop: 10 }}>
                                        <Text style={{ color: '#fff' }}>Sign Up</Text>
                                    </Button>
                                </Right>
                            </View>
                        </Form>
                    </View>
                </View>
                </ScrollView>
            )
        }
    }

    render() {
        // var erroShow = []
        //     for (let error = 0; error < this.state.errors.length; error++) {
        //         const element = this.state.errors[error];
        //         erroShow.push(<View key={error}>
        //             <Text>error</Text>
        //             <Text>error</Text>
        //             <Text>error</Text>
        //             <Text>error</Text>
        //         </View>)
        //     }

        return (
            <Container>
                {this.showScreen()}
                {/* {this.state.erroShow} */}
            </Container>
        )
    }
};

const styles = StyleSheet.create({
    login: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',

    },
    header: {
        // justifyContent: 'center',
        alignItems: 'center',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
    },
    form: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#f0f0f0',
        padding: 20,
        marginBottom: 80,
        justifyContent: 'center'
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

export default Login;