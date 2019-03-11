import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';
// import { createTabNavigator } from "react-navigation";
// import AppNavigator from './appTabNavigator/TabNav';

import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeTab from './appTabNavigator/HomeTab';
import LikesTab from './appTabNavigator/LikesTab';
import ProfileTab from './appTabNavigator/ProfileTab';
import SearchTab from './appTabNavigator/SearchTab';
import AddMediaTab from './appTabNavigator/AddMediaTab';

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return <AppNavigator />
    }
}


const AppContNavigator = createBottomTabNavigator({
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
    }
}, {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            activeTintColor: '#000',
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
