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
import { chkUName, chkEmail, chkPwd } from '../_util.js';
import axios from 'axios'; //axios for AJAX calls
//import api configurations
import { path, api } from '../_config.js';

class Signup extends Component {
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

  async userSignup() {
    if (!this.state.username || !this.state.password || !this.state.email) {
      Alert.alert('Error', 'Please complete all forms!');
      return;
    } else if (chkPwd(this.state.password, this.state.pwdConfirm).invalid) {
      Alert.alert('Error', chkPwd(this.state.password, this.state.pwdConfirm).message);
      return;
    } else if (chkEmail(this.state.email).invalid){
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    } else if (chkUName(this.state.username).invalid) {
      Alert.alert('Error', chkUName(this.state.username).message);
      return;
    } else {
      axios.post(path+api.user.signup, {
        user_name: this.state.username,
        user_email: this.state.email.toLowerCase(),
        password: this.state.password
      })
      .then(res => {
        if (res.status === 200) {
          this.saveItem('session', JSON.stringify(res.data))
          Actions.Home();
        } else if (res.status === 204) {
          Alert.alert('An account already exists for that username.');
        } else {
          Alert.alert('Something went wrong', 'Please restart the app.')
        }
      })
      .catch(error => console.error(error));
    }
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>Sign Up</Text>

        <View>
          <TextInput
            editable={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            maxLength={22}
            onChangeText={(username) => this.setState({username})}
            placeholder='Create Username'
            ref='username'
            returnKeyType='next'
            style={s.input}
            value={this.state.username}
          />
          <TextInput
            editable={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            onChangeText={(email) => this.setState({email})}
            keyboardType={'email-address'}
            placeholder='Enter Email Address'
            ref='email'
            returnKeyType='next'
            style={s.input}
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
            style={s.input}
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
            style={s.input}
            value={this.state.passwordConf}
          />
        </View>
        <TouchableOpacity onPress={this.userSignup.bind(this)}>
            <Text style={s.textBtn}> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Signup;

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