import React, { Component } from 'react';
import { StatusBar, Platform, StyleSheet, Text, AsyncStorage, FlatList } from 'react-native';
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Homescreen from './ecommerce/screens/Homescreen'
import LoadingScreen from './components/screen/Loading'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { Container, Header, ListItem, Item, Content, Left, Icon, Button, Right } from 'native-base';
import MainNavigation from './components/auth/MainNavigator';

const url = 'http://10.0.2.2/project/reactapi/public/api/';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      loged_in: '',
      loading: true
    }

  };

  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  };
  componentDidMount() {
    this.setState({
      loading: true
    })
    this.user()
    this.showScreen()
  }
  loginCheck() {
    // alert(this.state.token)
        var headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
      }
      axios.get(url + 'user/', { headers: headers })
            .then((response) => {
                // alert('success')
                // this.getItems()
                console.log(response);
                // this.setState({
                //   token: res.access_token
                // })
            }).catch((error) => {
                // alert('error')
                console.log(error.response);
            })
    // try {
    //   fetch('http://10.0.2.2/projects/reactApi/public/api/user', {
    //     method: 'GET',
    //     headers: {
    //       'Content-type': 'application/json',
    //       'Accept': 'application/json',
    //       'Authorization': 'Bearer ' + this.state.token,
    //     }
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       console.log('====================================');
    //       console.log(res);
    //       console.log('====================================');
    //       if (res.errors) {
    //         this.setState({
    //           errors: res.errors
    //         })
    //         return
    //       } else if (res.access_token) {
    //         this.setState({
    //           token: res.access_token
    //         })
    //         this.login()
    //       } else {
    //         // console.log(res)
    //       }
    //     }).done()
    // } catch (error) {
    //   alert(error.response.data.message)
    //   console.log(error.response);
    // }
  }

  user = async () => {
    try {
      let login = await AsyncStorage.getItem('login');
      this.setState({
        token: await AsyncStorage.getItem('token')
      })
      // console.log('====================================');
      // console.log(login);
      // console.log('====================================');
      if (login == 'true') {
        if (login == 'true') {
          // alert('logged in')
          this.setState({
            loged_in: 'true',
            loading: false
          })
          this.loginCheck()
        } else {
          alert('logged off')
          this.setState({
            loading: false,
            loged_in: 'false'
          })
        }
      } else {
        this.setState({
          loading: false,
          loged_in: 'false'
        })
      }
    } catch (error) {
      alert(error.response.data.message)
      console.log(error);
    }
  }

  showScreen = () => {
    if (this.state.loged_in == 'true' && this.state.loading == false) {
      return (<DraweNavigate />)
    } else if (this.state.loading == true) {
      // console.log('londing' , this.state.loading);

      return (<LoadingScreen />)
    }
    else {
      return (<AuthNav />)
    }
  }

  render() {
    return (
      <Container>
        {this.showScreen()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  }
});

const DrawerContaineContent = (props) => {
  return (
    <Container>
      <Header style={[{ backgroundColor: '#3a455c', height: 90 }, styles.androidHeader]}>
        <Left style={{ flex: 1, alignItems: 'center', flexDirection: 'row', }}>
          <Icon name='person' style={{ color: '#fff', }} />
          <Text style={{ marginLeft: 5, fontSize: 22, color: '#fff', fontStyle: 'italic' }}>Hellow, Jimmy</Text>
        </Left>
        <Right>
          <Button rounded danger>
            <Icon name='close' />
          </Button>
        </Right>
      </Header>
      <Content>
        <FlatList
          style={{ borderTopWidth: 0.5, borderTopColor: '#f0f0f0' }}
          data={[
            'Home', 'Shop by category', "Today's deals"
          ]}
          renderItem={({ item }) => (
            <ListItem noBorder>
              <Text>{item}</Text>
            </ListItem>
          )}
        />
      </Content>
    </Container>
  )
}

const AppDrawerNavigator = createDrawerNavigator({
  // Homescreen: {
  //   screen: Homescreen
  // },
  MainNavigation: {
    screen: MainNavigation
  }
}, {
    drawerPosition: 'left',
    // contentComponent: DrawerContaineContent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  })

const DraweNavigate = createAppContainer(AppDrawerNavigator);


const authNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  DraweNavigate: {
    screen: DraweNavigate
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
