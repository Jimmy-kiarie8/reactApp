import React, { Component } from 'react';
import { StyleSheet, Platform, StatusBar, AsyncStorage } from 'react-native';
import { Container, Header, Left, Right, Icon } from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from 'react-navigation-drawer';

export default class Homescreen extends Component {
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    };
    logout() {
        try {
            AsyncStorage.setItem('token', '');
            AsyncStorage.setItem('login', 'false');
            this.props.navigation.navigate('MainNavigation')
            this.setState({
                loading: false
            })
        } catch (error) {
            console.log(error);

        }
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
                        <Icon name="md-cart" onPress={() => this.logout()} style={{ color: '#fff' }} />
                    </Right>
                </Header>
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
