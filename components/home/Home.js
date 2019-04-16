import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native';

export default class Home extends Component {

  render() {
    return (
      <Container style={{justifyContent: 'center',alignContent: 'center',}}>
        <Text>Homescreen</Text>
      </Container>
    )

  }
}
