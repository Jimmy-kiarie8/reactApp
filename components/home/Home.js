// Home.js

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export class Home extends Component {
    render() {
        return (
            <View style={{ alignContent: 'center', justifyContent: 'center', }}>
                <Text>This is the Home screen</Text>
            </View>
        )
    }
};

export default Home;