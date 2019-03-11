import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon, Container, Content, Thumbnail, Header, Body, Left, Right } from "native-base";
import CardComponent from '../CardComponent';

export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Header style={{ backgroundColor: '#f0f0f0' }}>
                        <Left>
                            <Icon name="camera" style={{ padding: 10, }} />
                        </Left>
                        <Body>
                            <Text style={{ alignItems: 'center' }}>Instagram</Text>
                        </Body>
                        <Right>
                            <Icon name="send" style={{ padding: 10, }} />
                        </Right>
                    </Header>
                    {/* Stories Start */}
                    <View style={{ height: 100 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 7, }}>
                            <Text style={{ fontWeight: 'bold' }}>Stories</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="md-play" style={{ fontSize: 14 }} />
                                <Text style={{ fontWeight: 'bold' }}>Watch All</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    paddingStart: 5,
                                    paddingEnd: 5
                                }}
                            >
                                <Thumbnail source={require('../../assets/images/pro1.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/pro2.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/pro3.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/1.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/2.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/3.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/4.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/5.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/6.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/7.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/pro1.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/pro2.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                                <Thumbnail source={require('../../assets/images/pro3.jpg')} style={{ marginHorizontal: 5, borderColor: 'pink', borderWidth: 2, }} />
                            </ScrollView>
                        </View>
                    </View>
                    {/* Stories End */}

                    <CardComponent imageSource="1" likes="108" user='Jimmy' />
                    <CardComponent imageSource="2" likes="591" user='John Doe' />
                    <CardComponent imageSource="3" likes="127" user='Mary' />
                    <CardComponent imageSource="4" likes="322" user='Nicklaus' />
                    <CardComponent imageSource="5" likes="432" user='Becker' />
                    <CardComponent imageSource="6" likes="1009" user='Kyle' />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});
