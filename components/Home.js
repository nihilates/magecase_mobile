import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './_styles.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Actions.Auth();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async getProtected() {
  // getProtected() {
    console.log(this.props.token);
    var fake = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjExIiwiaWQiOjIsImlhdCI6MTUwMjgwNTkxMiwiZXhwIjoxNTAyODIzOTEyfQ.APZHJHm5MY2bMw4E5Sh83XUWXT_MQlviz__jf83hdj2'
    var token = await AsyncStorage.getItem('id_token');
    fetch("http://localhost:3001/api/protected/random-quote", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
        // 'Authorization': 'Bearer ' + fake
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home Page</Text>
        <TouchableOpacity style={styles.textBtn} onPress={this.userLogout.bind(this)}>
            <Text> Log Out </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textBtn} onPress={this.getProtected.bind(this)}>
            <Text> Check Token </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Home;