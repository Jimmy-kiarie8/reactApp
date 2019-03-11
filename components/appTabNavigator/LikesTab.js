import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Icon } from "native-base";

export default class LikesTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="heart" style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>LikesTab</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
