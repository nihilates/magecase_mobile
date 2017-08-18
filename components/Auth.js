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
import { binaryRender } from './_util.js';
/*import custom components*/
import Login from './components_auth/Login.js';
import Signup from './components_auth/Signup.js';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccount: true //toggle for "login" or "create account"
    };
  }

  accessMethod() {
    this.setState({hasAccount: !this.state.hasAccount});
  }

  render() {
    return (
      <View style={s.container}>
        {binaryRender(this.state.hasAccount, <Login />, <Signup />)}
        <TouchableOpacity onPress={this.accessMethod.bind(this)}>
            <Text style={s.textBtn}>{this.state.hasAccount ? 'Create Account' : 'Login Account'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Auth;

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
  textBtn: {
    fontWeight: 'bold',
    marginBottom: 5,
    flexDirection: 'row',
  }
});