import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Container, Content, Thumbnail, Header, Body, Left, Right, Button } from "native-base";
import EntypoIcon from 'react-native-vector-icons/Entypo';

import CardComponent from '../CardComponent';

var images = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/2.jpg'),
    require('../../assets/images/3.jpg'),
    require('../../assets/images/4.jpg'),
    require('../../assets/images/5.jpg'),
    require('../../assets/images/6.jpg'),
    require('../../assets/images/7.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/2.jpg'),
    require('../../assets/images/3.jpg'),
    require('../../assets/images/4.jpg'),
    require('../../assets/images/5.jpg'),
    require('../../assets/images/6.jpg'),
    require('../../assets/images/7.jpg'),
]
var { width, height } = Dimensions.get('window')
export default class ProfileTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }
    segmentClicked = (index) => {
        // console.log(index);

        this.setState({
            activeIndex: index
        })
    }
    renderSectionOne = () => {
        return images.map((image, index) => {
            return (
                <TouchableOpacity key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }, { paddingBottom: 2 }]}>
                    <Image source={image} style={{ flex: 1, width: undefined, height: undefined }} />
                </TouchableOpacity>
            )
        })
    }

    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                    {this.renderSectionOne()}
                </View>
            )
        } else if (this.state.activeIndex == 1) {
            return (
                <View>
                    <CardComponent likes="201" user="John Doe" imageSource="6" />
                    <CardComponent likes="201" user="Mary" imageSource="6" />
                    <CardComponent likes="201" user="Ann" imageSource="5" />
                    <CardComponent likes="201" user="Johnson" imageSource="4" />
                </View>
            )
        }
    }
    render() {


        return (
            <Container>
                <Header style={{ backgroundColor: '#f0f0f0' }}>
                    <Left>
                        <Icon name="md-person-add" style={{ padding: 10, }} />
                    </Left>
                    <Body>
                        <Text style={{ alignItems: 'center' }}>Instagram</Text>
                    </Body>
                    <Right>
                        <EntypoIcon name="back-in-time" style={{ paddingRight: 10, fontSize: 30, color: '#000' }}></EntypoIcon>
                    </Right>
                </Header>
                <Content>
                    <View style={{ padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image source={require('../../assets/images/me.jpg')} style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                            </View>
                            <View style={{ flex: 3 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>22</Text>
                                        <Text style={{ fontSize: 10, color: 'gray' }}>Posts</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>2992</Text>
                                        <Text style={{ fontSize: 10, color: 'gray' }}>Followers</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text>202</Text>
                                        <Text style={{ fontSize: 10, color: 'gray' }}>Followig</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                                    <Button bordered dark style={{ flex: 3, justifyContent: 'center', height: 30, marginLeft: 10, }}>
                                        <Text>Edit Profile</Text>
                                    </Button>
                                    <Button bordered dark style={{ flex: 3, justifyContent: 'center', height: 30, marginLeft: 5, marginRight: 10, }}>
                                        <Icon name="settings" />
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Jimmy Kiarie</Text>
                            <Text>vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos </Text>
                            <Text>www.Instagram.com </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#e5e5e5', }} >
                            <Button transparent onPress={() => this.segmentClicked(0)} active={this.state.activeIndex == 0}>
                                <Icon name="apps" style={[this.state.activeIndex == 0 ? {} : { color: 'grey' }]} />
                            </Button>
                            <Button transparent onPress={() => this.segmentClicked(1)} active={this.state.activeIndex == 1}>
                                <Icon name="list" style={[this.state.activeIndex == 1 ? {} : { color: 'grey' }]} />
                            </Button>
                            <Button transparent onPress={() => this.segmentClicked(2)} active={this.state.activeIndex == 2}>
                                <Icon name="people" style={[this.state.activeIndex == 2 ? {} : { color: 'grey' }]} />
                            </Button>
                            <Button transparent onPress={() => this.segmentClicked(3)} active={this.state.activeIndex == 3}>
                                <Icon name="bookmark" style={[this.state.activeIndex == 3 ? {} : { color: 'grey' }]} />
                            </Button>
                        </View>
                        {this.renderSection()}
                    </View>
                </Content>
            </Container>
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
