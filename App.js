import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Button, Container } from 'native-base';
import Home from './components/home/Home'
import MainScreen from './components/MainScreen';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // user: []
      loged_in: ''

    }
  }

  componentDidMount() {
    this.user()
  }

  user = async () => {
    try {
      let login = await AsyncStorage.getItem('login');
      // let parsed = JSON.parse(user);
      // return parsed.email
      // this.setState({
      //   user: parsed
      // })
      if (login) {
        if (login == 'true') {
          // alert('logged in')
          this.setState({
            loged_in: 'true'
          })
        } else {
          this.setState({
            loged_in: 'false'
          })
        }
      } else {
        this.setState({
          loged_in: 'false'
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  showUser() {
    console.log(this.state.loged_in);
  }

  showScreen = () => {
    console.log(this.state.loged_in);
    if (this.state.loged_in == 'true') {
      return (<MainScreen />)
      // <Home style={{ flex: 1 }} />
    } else {
      return (<AuthNav />)
    }


  }
  render() {
    return (
      <Container>{this.showScreen()}</Container>
      // <AuthNav />
    )

  }
}

const authNavigator = createBottomTabNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            // backgroundColor: 'white'
          }
        })
      },
      activeTintColor: '#000',
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true,
    }
  })

const AuthNav = createAppContainer(authNavigator);