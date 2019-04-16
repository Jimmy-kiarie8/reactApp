import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { createStackNavigator, createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import { Button, Container } from 'native-base';
// import Home from './components/home/Home'
// import MainScreen from './components/MainScreen';
import MainNavigation from './components/auth/MainNavigator';
import LoadingScreen from './components/screen/Loading'


// var SQLite = require('react-native-sqlite-storage')
// var db = SQLite.openDatabase({name: 'data', location: '~sqlitetest'});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      loged_in: '',
      loading: true
    }

  };


  componentDidMount() {
    this.setState({
      loading: true
    })
    this.user()
    this.showScreen()
  }
  loginCheck(accessToken) {
    // alert(accessToken)
    try {
      fetch('http://10.0.2.2/projects/reactApi/public/api/check', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        }
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res);
          if (res.errors) {
            alert(res.message)
            this.setState({
              errors: res.errors
            })
            // console.log(res)
            return
          } else if (res.access_token) {
            alert(res.message)
            this.setState({
              token: res.access_token
            })
            this.login()
          } else {
            alert(res.message)
          }
        }).done()
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  user = async () => {
    try {
      let login = await AsyncStorage.getItem('login');
      console.log('====================================');
      console.log(login)
      console.log('====================================');
      if (login == 'true') {
        if (login == 'true') {
          // alert('logged in')
          this.setState({
            loged_in: 'true',
            loading: false
          })
          // this.loginCheck(login)
        } else {
          // alert('logged off')
          this.setState({
            loading: false,
            loged_in: 'false'
          })
        }
      } else {
        // alert('dwd in')
        this.setState({
          loading: false,
          loged_in: 'false'
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  showUser() {
    // console.log(this.state.user_name)
    alert(this.state.user_name)
    // console.log(this.state.loged_in);
  }

  showScreen = () => {
    // this.props.navigation.navigate('LoadingScreen')
    // console.log(this.state.loged_in);
    if (this.state.loged_in == 'true' && this.state.loading == false) {
      // this.props.navigation.navigate('MainNavigation')
      return (<MainNavigation />)
      // <Home style={{ flex: 1 }} />
    } else if (this.state.loading == true) {
      return (<LoadingScreen />)
    }
    else {
      // this.props.navigation.navigate('AuthNav')
      return (<AuthNav />)
    }


  }
  render() {
    return (
      <Container>
        {this.showScreen()}
        {/* <Button onPress={this.showUser}>
          <Text>Press</Text>
        </Button> */}
        {/* <Text> Name {this.state.user_name}</Text> */}
        {/* <AuthNav /> */}
      </Container>
    )

  }
}

const authNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  MainNavigation: {
    screen: MainNavigation
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

// const mainNavigator = createMaterialTopTabNavigator({
//   HomeTab: {
//     screen: HomeTab
//   },
//   SearchTab: {
//     screen: SearchTab
//   },
//   AddMediaTab: {
//     screen: AddMediaTab
//   },
//   LikesTab: {
//     screen: LikesTab
//   },
//   ProfileTab: {
//     screen: ProfileTab
//   },
// }, {
//     animationEnabled: true,
//     swipeEnabled: true,
//     tabBarPosition: 'bottom',
//     tabBarOptions: {
//       style: {
//         ...Platform.select({
//           android: {
//             // backgroundColor: 'white'
//           }
//         })
//       },
//       activeTintColor: '#000',
//       inactiveTintColor: '#d1cece',
//       showLabel: false,
//       showIcon: true,
//     }
//   })

// const MainNav = createAppContainer(mainNavigator);
const AuthNav = createAppContainer(authNavigator);