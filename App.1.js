import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Button, Container } from 'native-base';
// import Home from './components/home/Home'
import MainScreen from './components/MainScreen';
import DrawerNav from './components/drawer/DrawerNav';
import LoadingScreen from './components/screen/Loading'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: []
      loged_in: ''

    }
  }

  componentDidMount() {
    // this.props.navigation.navigate('LoadingScreen')
    this.user()
    this.showScreen()

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
    // this.props.navigation.navigate('LoadingScreen')
    console.log(this.state.loged_in);
    if (this.state.loged_in == 'true') {
    // this.props.navigation.navigate('MainScreen')
    return (<DrawerNav />)
      // <Home style={{ flex: 1 }} />
    } else {
    // this.props.navigation.navigate('AuthNav')
    return (<AuthNav />)
    }


  }
  render() {
    return (
      <Container>
        {this.showScreen()}
      </Container>
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
  LoadingScreen: {
    screen: LoadingScreen
  },
  MainScreen: {
    screen: MainScreen
  },

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