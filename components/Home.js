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

  userLogout() {
    Actions.Auth();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home Page</Text>
        <TouchableOpacity onPress={this.userLogout.bind(this)}>
            <Text style={styles.body}> Log Out </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Home;