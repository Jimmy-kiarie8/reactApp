import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Icon, Container } from 'native-base';
// import { createTabNavigator } from "react-navigation";
// import AppNavigator from './appTabNavigator/TabNav';

import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import HomeTab from './appTabNavigator/HomeTab';
import LikesTab from './appTabNavigator/LikesTab';
import ProfileTab from './appTabNavigator/ProfileTab';
import SearchTab from './appTabNavigator/SearchTab';
import AddMediaTab from './appTabNavigator/AddMediaTab';
import Login from './auth/Login';
import Signup from './auth/Signup';
import LoadingScreen from './screen/Loading'

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
                <Text>Main screen</Text>
            </Container>
        )
    }
}


const AppContNavigator = createMaterialTopTabNavigator({
    HomeTab: {
        screen: HomeTab
    },
    SearchTab: {
        screen: SearchTab
    },
    AddMediaTab: {
        screen: AddMediaTab
    },
    LikesTab: {
        screen: LikesTab
    },
    ProfileTab: {
        screen: ProfileTab
    },
    Login: {
        screen: Login
    },
    Signup: {
        screen: Signup
    }
}, {
        initialRouteName: 'HomeTab',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: { backgroundColor: '#694fad' },
        // // animationEnabled: true,
        // // swipeEnabled: true,
        // // tabBarPosition: 'bottom',
        tabBarOptions: {
            // style: {
            //     ...Platform.select({
            //         android: {
            //             backgroundColor: 'white'
            //         }
            //     })
            // },
            activeTintColor: '#fff',
            inactiveTintColor: '#d1cece',
            showLabel: false,
            showIcon: true,
        }
    })


const AppNavigator = createAppContainer(AppContNavigator)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
