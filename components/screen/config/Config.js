import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

const url = 'http://10.0.2.2/project/reactapi/public/api/'
export default class Config extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: ''
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        this.user()
    }
    user = async () => {
        try {
            // alert('test')
            let token = await AsyncStorage.getItem('token');
            this.setState({
                token: token
            })
            this.loginCheck()
        } catch (error) {
            console.log(error);
        }
    }
    loginCheck() {
        alert(this.state.token)
        try {
            fetch('http://10.0.2.2/project/reactapi/public/api/user', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.state.token,
                }
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.errors) {
                        this.setState({
                            errors: res.errors
                        })
                        return
                    } else if (res.access_token) {
                        this.setState({
                            token: res.access_token
                        })
                        this.login()
                    } else {
                        // console.log(res)
                    }
                }).done()
        } catch (error) {
            alert(error.response.data.message)
            console.log(error.response);
        }
    }
}