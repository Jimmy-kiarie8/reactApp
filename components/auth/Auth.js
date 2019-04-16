import React, { Component } from 'react';
import { Platform } from 'react-native';
import Login from './Login';
import Signup from './Signup';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
// import LoadingScreen from '../screen/Loading'

export default class Auth extends Component {
  render() {
    return (
      <AuthNav />
    )

  }
}

const authNavigator = createBottomTabNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  // LoadingScreen: {
  //   screen: LoadingScreen
  // },

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