import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, AsyncStorage, Image } from 'react-native';
import { Container, Header, Content, Left, Right, Icon, Input, Item, CardItem, Card } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Recomendation from '../components/Recomendation'
import Swiper from 'react-native-swiper';
import { DrawerActions } from 'react-navigation-drawer';
import axios from 'axios';

const url = 'http://10.0.2.2/project/reactapi/public/api/'
export default class Homescreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
        }
    }
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    };
    user = async () => {
        try {
            // alert('test')
            let token = await AsyncStorage.getItem('token');
            this.setState({
                token: token
            })
        } catch (error) {
            alert(error.response.data.message)
            console.log(error);
        }
    }
    componentDidMount() {
        this.user()
    }

    logout() {
        try {
            AsyncStorage.setItem('token', '');
            AsyncStorage.setItem('login', 'false');
            // this.props.navigation.navigate('MainNavigation')
            this.setState({
                loading: false
            })
            this.logoutToken()
        } catch (error) {
            console.log(error);

        }
    }
    logoutToken() {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
        }
        // console.log(this.state.token)
        // return
        axios.get(url + 'auth/logout', { headers: headers })
            .then((response) => {
                console.log(response.data);
                AsyncStorage.setItem('token', '');
                AsyncStorage.setItem('login', 'false');
                this.props.navigation.navigate('Login')
                // this.setState({
                //     loading: false
                // })
                // this.logoutToken()
            }).catch((error) => {
                alert(error.response.data.message)
                console.log(error.response);

            })
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#3a455c', height: 90, borderBottomWidth: 1, borderBottomColor: '#757575' }}>
                    <Left style={{ flexDirection: 'row' }}>
                        <Icon name="md-menu" onPress={this.toggleDrawer.bind(this)} style={{ color: '#fff', marginRight: 15 }} />
                        <FAIcon name='amazon' style={{ fontSize: 32, color: '#fff' }} />
                    </Left>
                    <Right style={{ flexDirection: 'row' }}>
                        <Icon name="md-cart" onPress={() => this.logoutToken()} style={{ color: '#fff' }} />
                    </Right>
                </Header>
                <View
                    style={{
                        flexDirection: 'row', backgroundColor: '#3a455c',
                        height: 70, position: 'absolute', left: 0, top: 90,
                        alignItems: 'center', paddingHorizontal: 5, width: '100%'
                    }}
                >
                    <TouchableOpacity>
                        <View style={{ width: 100, backgroundColor: '#e7e7eb', height: 50, borderRadius: 5, padding: 10 }}>
                            <Text style={{ fontSize: 12 }}>Shop by</Text>
                            <Text style={{ fontWeight: 'bold' }}>Category</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center', borderRadius: 7 }}>
                        <Item style={{ backgroundColor: '#fff' }}>
                            <Icon name='search' style={{ fontSize: 20, paddingTop: 5 }} />
                            <Input placeholder='search' />
                        </Item>
                    </View>
                </View>
                <Content style={{ backgroundColor: '#d5d5d6', marginTop: 70 }}>
                    <View
                        style={{
                            height: 50, backgroundColor: '#fff', flexDirection: 'row',
                            paddingHorizontal: 5, alignItems: 'center', justifyContent: 'space-between'
                        }}>
                        <Text>Hello, Jimmy</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text>Your account</Text>
                            <Icon name='arrow-forward' style={{ fontSize: 18, marginTop: 2 }} />
                        </View>
                    </View>

                    <Swiper autoplay={true} style={{ height: 100 }}>
                        <View style={{ flex: 1 }}>
                            <Image style={{ height: 100 }} source={require('../../assets/images/pro1.jpg')} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image style={{ height: 100 }} source={require('../../assets/images/pro2.jpg')} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image style={{ height: 100 }} source={require('../../assets/images/pro3.jpg')} />
                        </View>
                    </Swiper>
                    <Card style={{ marginLeft: 5, marginRight: 5 }}>
                        <CardItem style={{ borderBottomWidth: .4, borderBottomColor: 'dee0e2' }}>
                            <Text>Your Recomendations</Text>
                        </CardItem>
                        <Recomendation />
                    </Card>
                </Content>
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
