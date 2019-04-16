import React, { Component } from 'react';
import { platform, StyleSheet, TextInput, View, Text, ScrollView, Button, RefreshControl, AsyncStorage, Alert } from 'react-native';
import { Icon, Form, Item } from "native-base";
import axios, { post } from 'axios';
import PhotoUpload from 'react-native-photo-upload'
import ImagePicker from 'react-native-image-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';


const url = 'http://10.0.2.2/project/reactapi/public/api/';

export default class LikesTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="heart" style={{ color: tintColor }} />
        )
    }

    constructor(props) {
    
        super(props)
     
        this.state = {
     
          text_id: '',
          text_name: '',
          text_active: '',
        }
     
      }
  
      componentDidMount(){
  
       // Received Student Details Sent From Previous Activity and Set Into State.
    //    alert('dwdwd')
       this.setState({ 
         text_id : this.props.navigation.state.params.id,
         text_name: this.props.navigation.state.params.name,
         text_active: this.props.navigation.state.params.active,
       })
  
      }
   
     static navigationOptions =
     {
        title: 'LikesTab',
     };


    state = {
        photo: null,
        refreshing: false,
        token: ''
    }
    UpdateStudentRecord = () =>{
      
        fetch(url + 'items/' + this.state.text_id, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name : this.state.text_name,
          active : this.state.text_active,
        })
  
        }).then((response) => response.json())
            .then((responseJson) => {
  
              // Showing response message coming from server updating records.
              Alert.alert(responseJson);
  
            }).catch((error) => {
              console.error(error);
            });
  
  }


    _onRefresh = () => {
        this.setState({ refreshing: true });

    }
    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    }

    componentDidMount() {
        this.user()
    }

    handleUploadPhoto = () => {
        // alert('uploading')
        this.setState({ refreshing: true })
        console.log('====================================');
        console.log(this.state.photo);
        console.log('====================================');

        var headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
            'Content-Type': 'multipart/form-data'
        }
        this.setState({ refreshing: true });
        axios.post(url + 'image', createFormData(this.state.photo, { userId: "1" }), { headers: headers })
            .then((response) => {
                this.setState({
                    refreshing: false
                })
                console.log("upload succes", response);
            }).catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
                alert("Upload failed!");
            })
    };

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
        // const itemId = navigation.getParam('id', 'name');
        const { photo } = this.state
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                <View style={styles.MainContainer}>
   
   <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Student Record Form </Text>

   <TextInput
     
     placeholder="Student Name Shows Here"
     
     value={this.state.text_name}

     onChangeText={ TextInputValue => this.setState({ text_name : TextInputValue }) }

     underlineColorAndroid='transparent'

     style={styles.TextInputStyleClass}
   />

  <TextInput
     
     placeholder="Student Class Shows Here"

     value={this.state.text_active}

     onChangeText={ TextInputValue => this.setState({ text_active : TextInputValue }) }

     underlineColorAndroid='transparent'

     style={styles.TextInputStyleClass}
   />
  <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >

     <Text style={styles.TextStyle}> UPDATE RECORD </Text>

  </TouchableOpacity>

  <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >

     <Text style={styles.TextStyle}> DELETE RECORD </Text>

  </TouchableOpacity>


</View>
            </ScrollView>
        )
    }
}

const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri:
            platform === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};



const styles = StyleSheet.create({
   

  TextInputStyleClass: {

    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5 ,
  
    },
  
    TouchableOpacityStyle: {
  
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width: '90%',
      backgroundColor: '#00BCD4'
  
    },
  
    TextStyle:{
      color:'#fff',
      textAlign:'center',
    },
  
});
