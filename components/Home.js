//Landing Page after authentication.
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
//import api configurations
import { path, api } from './_config.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
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
    var token = await AsyncStorage.getItem('id_token');
    fetch(path+api.user.test, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      this.setState({accounts: data});
    })
    .done();
  }

  navChar() { //Temporary Nav button for testing purposes
    Actions.CharDetails();
  }

  navGame() { //Temporary Nav button for testing purposes
    Actions.GameDetails();
  }

  navItems() { //Temporary Nav button for testing purposes
    Actions.Items();
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

        <View>
          {this.state.accounts.map((account, i) => {
            return (
              <Text key={i}>{account.user_name} _> {account.user_email}</Text>
            )
          })}
        </View>

        <TouchableOpacity style={styles.textBtn} onPress={this.navItems.bind(this)}>
            <Text> Items </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textBtn} onPress={this.navChar.bind(this)}>
            <Text> Characters </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textBtn} onPress={this.navGame.bind(this)}>
            <Text> Games </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default Home;