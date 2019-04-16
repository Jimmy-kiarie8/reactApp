import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Icon, Container } from 'native-base';
// import { createTabNavigator } from "react-navigation";
// import AppNavigator from './appTabNavigator/TabNav';

import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeTab from '../appTabNavigator/HomeTab';
import LikesTab from '../appTabNavigator/LikesTab';
import ProfileTab from '../appTabNavigator/ProfileTab';
import SearchTab from '../appTabNavigator/SearchTab';
import AddMediaTab from '../appTabNavigator/AddMediaTab';
// import Login from './Login';
// import Signup from './Signup';
// import LoadingScreen from './screen/Loading'

export default class MainNavigation extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Container>
                <AppNavigator />
            </Container>
        )
    }
}


const AppContNavigator = createStackNavigator({
    HomeTab: {
        screen: HomeTab,
        tabBarColor: 'red'
    },
    AddMediaTab: {
        screen: AddMediaTab
    },
    SearchTab: {
        screen: SearchTab,
        tabBarColor: 'green'
    },
    LikesTab: {
        screen: LikesTab
    },
    ProfileTab: {
        screen: ProfileTab
    },
    // Login: {
    //     screen: Login
    // },
    // Signup: {
    //     screen: Signup
    // }
}, {
        animationEnabled: true,
        // swipeEnabled: true,
        // // tabBarPosition: 'bottom',
        tabBarOptions: {
            shifting: true,
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: '#3c807b'
                    }
                })
            },
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
