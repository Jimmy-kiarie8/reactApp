import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeTab from './HomeTab';
import LikesTab from './LikesTab';
import ProfileTab from './ProfileTab';
import SearchTab from './SearchTab';
import AddMediaTab from './AddMediaTab';

const AppNavigator = createBottomTabNavigator({
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
})


export default createAppContainer(AppNavigator)
