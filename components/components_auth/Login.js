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
import styles from '../_styles.js';
//import api configurations
import { path, api } from '../_config.js';

class Login extends Component {
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
    console.log(this.props)
    if (!this.state.username || !this.state.password) return;

    fetch(path+api.user.login+'?identity='+this.state.username+'&password='+this.state.password)
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
        this.saveItem('id_token', responseData.auth.id_token);
        Actions.Home();
      }
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        <View>
          <TextInput
            editable={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username or Email'
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
            clearTextOnFocus={true}
            style={styles.input}
            value={this.state.password}
          />
        </View>

        <TouchableOpacity style={styles.textBtn} onPress={this.userLogin.bind(this)}>
            <Text style={styles.bold}> Log In </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default Login;