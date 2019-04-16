import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import { Icon, Button, Form, Container, Textarea, Item } from "native-base";
import Axios from 'axios';

const url = 'http://10.0.2.2/project/reactapi/public/api/'
export default class AddMediaTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-add" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            item: '',
            description: '',
            refreshing: false,
        }
    }
    componentDidMount() {
        this.user()
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
    }
    addItem(item, description) {
        // this._onRefresh()
        this.setState({ refreshing: true });
        // alert('adding')
        let data = {
            item: item,
            description: description,
        }
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
        }
        Axios.post(url + 'items', data, { headers: headers })
            .then((response) => {
                alert(response.data.message)
                console.log(response);
                this.setState({
                    refreshing: false
                })
                console.log(response);
                // this.props.navigation.navigate('HomeTab')
            }).catch((error) => {
                alert('error')
                this.setState({
                    refreshing: false
                })
                console.log(error.response);
            })
    }
    user = async () => {
        try {
            // alert('test')
            let token = await AsyncStorage.getItem('token');
            this.setState({
                token: token
            })
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                <View style={styles.container}>
                    <Form>
                        <Container style={styles.inpuItem}>
                            <Item rounded style={{ marginTop: 10 }}>
                                <TextInput placeholder="Item name" style={{ width: 100 + '%', height: null }}
                                    onChangeText={(item) => this.setState({ item })}
                                />
                            </Item>
                            <Item rounded style={{ marginTop: 10 }}>
                                <Textarea placeholder="Item description" style={{ width: 100 + '%', height: null }}
                                    onChangeText={(description) => this.setState({ description })}
                                />
                            </Item>
                            <Button rounded
                                onPress={() => this.addItem(this.state.item, this.state.description)}
                                primary style={{ paddingHorizontal: 30, marginTop: 10 }}>
                                <Text style={{ color: '#fff' }}>Submit</Text>
                            </Button>
                        </Container>
                    </Form>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inpuItem: {

    },
});
