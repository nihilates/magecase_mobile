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
import axios from 'axios'; //axios for AJAX calls
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

  async userLogin() {
    if (!this.state.username || !this.state.password) return;

    // axios.get(path+api.user.login+'?identity='+this.state.username+'&password='+this.state.password)
    axios.get(path+api.user.login, {
      params: {
        identity: this.state.username,
        password: this.state.password
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.saveItem('session', JSON.stringify(res.data))
        Actions.Home();
      } else if (res.status === 204) {
        Alert.alert('Incorrect username or password', 'Please try again.');
      } else {
        Alert.alert('Something went wrong', 'Please restart the app.')
      }
    })
    .catch(error => console.error(error));
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>Sign In</Text>

        <View>
          <TextInput
            editable={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            onChangeText={(username) => this.setState({username})}
            placeholder='Username or Email'
            ref='username'
            returnKeyType='next'
            style={s.input}
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
            style={s.input}
            value={this.state.password}
          />
        </View>

        <TouchableOpacity onPress={this.userLogin.bind(this)}>
            <Text style={s.textBtn}> Log In </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default Login;

const s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 190,
  },
  textBtn: {
    fontWeight: 'bold',
    marginBottom: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});