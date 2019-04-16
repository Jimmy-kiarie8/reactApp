import React, { Component } from 'react';
import { createDrawerNavigator, DrawerActions } from 'react-navigation'
import { Icon, Header } from 'native-base'
//these are the components to be navigated to from the menu
import Rick from '../../components/auth/Signup'
import Morty from '../../components/appTabNavigator/LikesTab'
import MrPoopyButthole from '../../components/appTabNavigator/ProfileTab'
import BabyLegs from '../../components/appTabNavigator/TabNav'
const Menu = createDrawerNavigator(
    {
        Rick: { screen: Rick },
        Morty: { screen: Morty },
        MrPoopyButthole: { screen: MrPoopyButthole },
        BabyLegs: { screen: BabyLegs }
    },
    {
        drawerWidth: 300,
        drawerPosition: 'left',
        initialRouteName: 'Rick',
    }
)
const MenuContainer = () => {
    let pressMenu

    return (
        <React.Fragment>
            <Header
                backgroundColor="white"
                leftComponent={
                    <Icon
                        name="menu"
                        onPress={() => {
                            pressMenu.dispatch(DrawerActions.toggleDrawer())
                        }}
                    />
                }
            />
            <Menu
                ref={navigatorRef => { pressMenu = navigatorRef }}
            />
        </React.Fragment>
    )
}
export default MenuContainer