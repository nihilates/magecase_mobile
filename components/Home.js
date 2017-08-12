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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home Page</Text>
        <TouchableOpacity style={styles.button} onPress={this.userLogout.bind(this)}>
            <Text> Log Out </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Home;