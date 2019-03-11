import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Icon, Button, Card, Right, Left, Thumbnail, Body, CardItem } from "native-base";

export default class CardComponent extends Component {
    render() {
        const images = {
            '1': require('../assets/images/1.jpg'),
            '2': require('../assets/images/2.jpg'),
            '3': require('../assets/images/3.jpg'),
            '4': require('../assets/images/4.jpg'),
            '5': require('../assets/images/5.jpg'),
            '6': require('../assets/images/6.jpg'),
        }
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/images/me.jpg')} />
                        <Body>
                            <Text>{this.props.user}</Text>
                            <Text>March 9, 2019</Text>
                        </Body>
                    </Left>
                </CardItem>

                <CardItem cardBody>
                    <Image source={images[this.props.imageSource]} style={{ width: null, height: 200, flex: 1 }} />
                </CardItem>

                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                            <Icon name="heart" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="chatbubbles" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="send" style={{ color: 'black' }} />
                        </Button>
                    </Left>
                </CardItem>

                <CardItem>
                    <Text>{this.props.likes} Likes</Text>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: '900' }}>{this.props.user} </Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.                        </Text>
                    </Body>
                </CardItem>
            </Card>
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
