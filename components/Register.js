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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {username: null, email: null, password: null, pwdConfirm: null};
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  existingUser() {
    Actions.Auth();
  }

  userSignup() {
    if (!this.state.username || !this.state.password || !this.state.email) {
      Alert.alert('Please complete all forms!');
      return;
    } else if (this.state.password !== this.state.pwdConfirm) {
      Alert.alert('Your passwords don\'t match!');
      return;
    } else {
      fetch('http://192.168.1.168:3001/users', { //TODO: This is a temporary database. A real one needs to be set up.
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        })
      })
      .then(response => {
        if (response.status === 400) {
          return null;
        } else {
          return response.json();
        }
      })
      .then(responseData => {
        if (responseData === null) {
          Alert.alert('Username already exists!');
        } else {
          this.saveItem('id_token', responseData.id_token);
          Alert.alert( 'Welcome to Magecase!');
          Actions.Home();
        }
      })
      .done();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <View>
          <TextInput
            editable={true}
            autoCorrect={false}
            onChangeText={(username) => this.setState({username})}
            placeholder='Create Username'
            ref='username'
            returnKeyType='next'
            style={styles.input}
            value={this.state.username}
          />
          <TextInput
            editable={true}
            autoCorrect={false}
            onChangeText={(email) => this.setState({email})}
            placeholder='Enter Email Address'
            ref='email'
            returnKeyType='next'
            style={styles.input}
            value={this.state.email}
          />
          <TextInput
            editable={true}
            autoCorrect={false}
            onChangeText={(password) => this.setState({password})}
            placeholder='Create Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
          />
          <TextInput
            editable={true}
            autoCorrect={false}
            onChangeText={(pwdConfirm) => this.setState({pwdConfirm})}
            placeholder='Confirm Password'
            ref='pwdConfirm'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.input}
            value={this.state.passwordConf}
          />
        </View>
        <TouchableOpacity style={styles.textBtn} onPress={this.userSignup.bind(this)}>
            <Text style={styles.bold}> Submit </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textBtn} onPress={this.existingUser.bind(this)}>
            <Text> Existing user? </Text>
            <Text style={styles.bold}>Login!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Register;