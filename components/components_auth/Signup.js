import React, { Component } from 'react';
import {
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { saveToken, chkForm } from '../_util.js';
import axios from 'axios'; //axios for AJAX calls
//import api configurations
import { path, api } from '../_config.js';
//import custom components
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {username: null, email: null, password: null, pwdConfirm: null};
  }

  userSignup() { //method to process user inputs during signup process
    if (!chkForm( //if the form fields do not comply with the required information and format...
      { username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        pwdConfirm: this.state.pwdConfirm,
      })) { return; //end the registration attempt and send a specific error message (see _util.js for details)
    } else { //Otherwise, send the database the login information
      axios.post(path+api.user.signup, {
        user_name: this.state.username,
        user_email: this.state.email.toLowerCase(),
        password: this.state.password
      })
      .then(res => {
        if (res.status === 200) { //if response is 200...
          saveToken('session', res.data) //save non-sensitive user account information and JSON webtoken
          Actions.Home(); //transition to the Home component page
        } else if (res.status === 204) { //if response is 204...
          Alert.alert('That username already exists.'); //a username must already exist
        } else {
          Alert.alert('Something went wrong', 'Please try again later.'); //if this message shows, something must have went wrong on the server side
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
          <TextInput //Text input for a user's name
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
          <TextInput //Text input for a user's email address
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
          <TextInput //text input for first password setting attempt
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
          <TextInput //text input for second password setting attempt, to compare to the first
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

        <SimpleBtn
          callback={this.userSignup.bind(this)}
          buttonText="Submit"
        />
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