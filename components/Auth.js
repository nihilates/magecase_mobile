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
import { Actions } from 'react-native-router-flux';
import styles from './_styles.js';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  userLogin() {
    if (!this.state.username || !this.state.password) return;

    fetch('http://192.168.1.168:3001/sessions/create', { //TODO: This is a temporary database. A real one needs to be set up.
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(response => {
      if (response.status === 401) {
        return null;
      } else {
        return response.json();
      }
    })
    .then(responseData => {
      if (responseData === null) {
        Alert.alert('Incorrect username or password', 'Please try again');
      } else {
        this.saveItem('id_token', responseData.id_token);
        Actions.Home();
      }
    })
    .done();
  }

  newUser() {
    Actions.Register();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <View>
          <TextInput
            editable={true}
            autoCorrect={false}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            ref='username'
            returnKeyType='next'
            style={styles.input}
            value={this.state.username}
          />
          <TextInput
            editable={true}
            autoCorrect={false}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
          />
        </View>

        <TouchableOpacity style={styles.textBtn} onPress={this.userLogin.bind(this)}>
            <Text style={styles.bold}> Log In </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textBtn} onPress={this.newUser.bind(this)}>
            <Text> New user? </Text>
            <Text style={styles.bold}>Sign Up!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Auth;