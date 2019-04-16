import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, DatePicker, Left, Right, Button } from "native-base";
import axios from 'axios';

const url = 'http://10.0.2.2/project/reactapi/public/api/';
export default class SearchTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="search" style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props);
        this.state = { 
            chosenDate: new Date(),
            chosenEndDate: new Date(),
            token: '',
        };
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
      }
      setStartDate(newDate) {
        this.setState({ chosenDate: newDate });
      }
      setEndDate(EndDate) {
        this.setState({ chosenEndDate: EndDate });
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

    componentDidMount() {
        this.user()
    }

      filter() {
        var item = {
            'start_date': this.state.chosenDate,
            'end_date': this.state.chosenEndDate,

        }

        console.log('====================================');
        console.log(item.end_date);
        console.log('====================================');
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
        }
        axios.post(url + 'filter/', this.state.chosenEndDate, { headers: headers })
            .then((response) => {
                // alert(response.data.message)
                console.log(response);
            }).catch((error) => {
                // alert(response.error.message)
                console.log(error.response);
            })
      }

    render() {
        return (
            <View style={{flex:1}}>
            <View style={{flexDirection: 'row'}}>
                <Left>

                    <DatePicker
                    defaultDate={new Date(2019, 4, 15)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select start date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setStartDate}
                    disabled={false}
                    />
                </Left>
                <Right>
                    <DatePicker
                    defaultDate={new Date(2019, 4, 15)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select end date"
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setEndDate}
                    disabled={false}
                    />
                </Right>
            </View>
            <Button rounded onPress={() => this.filter()} style={{ paddingHorizontal: 30}}>
                <Text style={{ color: '#fff' }}>Filter</Text>
            </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
});
