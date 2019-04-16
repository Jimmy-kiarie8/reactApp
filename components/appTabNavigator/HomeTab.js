import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, RefreshControl, AsyncStorage } from 'react-native';
import { Icon, Container, Content, Radio, Header, Body, Left, Right, Form, Item, Button, CheckBox } from "native-base";
import axios from 'axios';

const url = 'http://10.0.2.2/project/reactapi/public/api/';
export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props);
        this.state = ({
            name: '',
            description: '',
            loading: false,
            errors: [],
            token: '',
            listItems: [],
            refreshing: false,
        })
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getItems()

    }

    user = async () => {
        try {
            // alert('test')
            let token = await AsyncStorage.getItem('token');
            this.setState({
                token: token
            })
            // console.log('*********************============***************');
            // console.log(this.state.token)
            // console.log('*********************============***************');
            this.getItems()
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.user()
    }

    getItems() {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
        }
        this.setState({ refreshing: true });
        axios.get(url + 'items', { headers: headers })
            .then((response) => {
                // console.log(response);
                this.setState({
                    listItems: response.data,
                    refreshing: false
                })


            }).catch((error) => {
                console.log('========****************************===================');
                console.log(error);
                console.log('====================================');
                console.log('========****************************===================');
            })
    }

    checkItem(item) {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
        }
        axios.post(url + 'checkItem/' + item.id, item, { headers: headers })
            .then((response) => {
                // alert(response.data.message)
                this.getItems()
                // console.log(response);
            }).catch((error) => {
                // alert(response.error.message)
                console.log(error.response);
            })
    }
    deleteItem(item) {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
        }
        axios.delete(url + 'items/' + item.id, { headers: headers })
            .then((response) => {
                // alert('success')
                this.getItems()
                // console.log(response);
            }).catch((error) => {
                console.log(error);
            })
    }

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


    GetStudentIDFunction=(id,name, active)=>{
        console.log('====================================');
        console.log(id, name, active);
        console.log('====================================');
        this.props.navigation.navigate('LikesTab', { 
          id : id,
          name : name,
          active : active,
        });

   }

    editItem = (item) => {
        console.log(item);

        this.props.navigation.navigate(
            'Login'
        );
        // axios.get(url + 'items/' + item.id)
        //     .then((response) => {
        //         // alert('success')
        //         // this.getItems()
        //         console.log(response);
        //         this.props.navigation.navigate('Details', {
        //             data: response.data,
        //         });
        //     }).catch((error) => {
        //         console.log(error);
        //     })
    }

    render() {
        var list = []
        if (this.state.listItems.length > 0) {
            
        this.state.listItems.forEach(element => {
            if (element.active == false) {
                list.push(
                    <View key={element.id} style={styles.listItem}>
                        <View style={styles.border}>
                            <Left>
                                <CheckBox checked={element.active}
                                    onPress={() => this.checkItem(element)} />
                            </Left>
                            <Text style={{ fontSize: 20, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{element['name']}</Text>
                            <Right>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-remove-circle-outline" style={{ color: 'red', padding: 10, }}
                                        onPress={() => this.deleteItem(element)}
                                    />
                                    <Icon name="md-brush" style={{ color: 'blue', padding: 10, }}
                                        onPress={() => this.editItem(element)}
                                    />
                                </View>
                            </Right>
                        </View>
                    </View>)
            } else {
                list.push(
                    <View key={element.id} style={styles.listItem}>
                        <View style={styles.border}>
                            <Left>
                                <CheckBox checked={element.active}
                                    onPress={() => this.checkItem(element)} />
                            </Left>
                            <Text style={{ fontSize: 20 }}>{element['name']}</Text>
                            <Right>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-remove-circle-outline" style={{ color: 'red', padding: 10, }}
                                        onPress={() => this.deleteItem(element)}
                                    />
                                    <Icon name="md-brush" style={{ color: 'blue', padding: 10, }}
                                        onPress={() => {
                                            /* 1. Navigate to the Details route with params */
                                            this.props.navigation.navigate('LikesTab', {
                                              name: 'jimmy',
                                            });
                                          }}
                                    />
                                </View>
                            </Right>
                        </View>
                    </View>)
            }
        });
    }

/*
    if (this.state.listItems.length > 0) {
            
        this.state.listItems.forEach(element => {
            if (element.active == false) {
                list.push(
                    <View key={element.id} style={styles.listItem}>
                        <View style={styles.border}>
                            <Left>
                                <Radio selected={element.active}
                                    onPress={() => this.checkItem(element)} />
                            </Left>
                            <Text style={{ fontSize: 20, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{element['name']}</Text>
                            <Right>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-remove-circle-outline" style={{ color: 'red', padding: 10, }}
                                        onPress={() => this.deleteItem(element)}
                                    />
                                    <Icon name="md-brush" style={{ color: 'blue', padding: 10, }}
                                        onPress={() => this.editItem(element)}
                                    />
                                </View>
                            </Right>
                        </View>
                    </View>)
            } else {
                list.push(
                    <View key={element.id} style={styles.listItem}>
                        <View style={styles.border}>
                            <Left>
                                <Radio selected={element.active}
                                    onPress={() => this.checkItem(element)} />
                            </Left>
                            <Text style={{ fontSize: 20 }}>{element['name']}</Text>
                            <Right>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="ios-remove-circle-outline" style={{ color: 'red', padding: 10, }}
                                        onPress={() => this.deleteItem(element)}
                                    />
                                    <Icon name="md-brush" style={{ color: 'blue', padding: 10, }}
                                        onPress={() => {
                                            this.props.navigation.navigate('LikesTab', {
                                                name: 'jimmy',
                                              });
                                            }}
                                      />
                                  </View>
                              </Right>
                          </View>
                      </View>)
              }
          });
      }
  */

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                <Container style={styles.container}>
                    <Content>
                        <Header style={{ backgroundColor: '#f0f0f0', height: 90 }}>
                            <Left>
                                <Icon name="md-add" style={{ padding: 10, }}
                                    onPress={() => this.props.navigation.navigate('AddMediaTab')}
                                />
                            </Left>
                            <Body>
                                <Text style={{ alignItems: 'center', marginLeft: 80, fontSize: 18, fontWeight: 'bold', }}>Shopping</Text>
                            </Body>
                            <Right>
                                <Icon name="refresh" style={{ padding: 10, }} onPress={() => this.getItems()} />
                            </Right>
                        </Header>

                        <View style={styles.list}>
                            {list}
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                        <Left>
                        <Icon name="ios-time" style={{ padding: 10, }}
                            onPress={() => this.props.navigation.navigate('SearchTab')}
                        />
                        </Left>
                        <Right>
                        <Icon name="refresh" style={{ padding: 10, }}
                            onPress={() => this.logout()}
                        />
                        </Right>
                        </View>
                    </Content>
                </Container>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    list: {
        backgroundColor: '#f0f0f0'
    },
    listItem: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    border: {
        flexDirection: 'row',
        flex: 1,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingVertical: 10,
    },
});
