import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { Left, Right, Icon, CardItem, Container } from 'native-base';
import axios from 'axios';


const image_url = 'http://10.0.2.2/project/reactapi/';
const url = 'http://10.0.2.2/project/reactapi/public/api/'
export default class Homescreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
      token: '',
      allProducts: [],
    }
  }
  getUser() {
    var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.state.token,
    }
    // alert(this.state.token)
    axios.get(url + 'user', { headers: headers })
      .then((response) => {
        this.setState({
          // user: response.data
        })
      }).catch((error) => {
        alert(error.response.data.message)
        console.log(error);

      })
  }

  getProducts() {
    var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.state.token,
    }
    // alert(this.state.token)
    axios.get(url + 'products', { headers: headers })
      .then((response) => {
        this.setState({
          // user: response.data
        })
        this.setState({
          allProducts: response.data,
        })
        console.log(response.data);
      }).catch((error) => {
        alert(error.response.data.message)
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
      this.getProducts()
      this.getUser()
    } catch (error) {
      alert(error.response.data.message)
      console.log(error);
    }
  }


  componentDidMount = () => {
    this.user()
  }

  render() {
    products = []
    this.state.allProducts.forEach(element => {
      products.push(
        <CardItem key={element.id}>
          <View>
            <Image style={{ height: 90, width: 90 }} source={{ uri: image_url + 'storage/app/public/products/' + element.image }} />
          </View>
          <Right style={{ flex: 1, alignItems: 'flex-start', height: 90, paddingHorizontal: 20 }}>
            <Text>{element.name}</Text>
            <Text style={{ fontSize: 11, color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{element.list_price}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>{element.price}</Text>
            <Text>
              <Text>You save</Text>
              <Text> Ksh{element.price - element.list_price}</Text>
            </Text>
          </Right>
        </CardItem>
      )
    });
    return (
      <Container>
        {products}
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});
