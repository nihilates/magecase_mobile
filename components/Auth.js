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
import { binaryRender } from './utilities/util.js';
/*import custom components*/
import Login from './components_auth/Login.js';
import Signup from './components_auth/Signup.js';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccount: true
    };
  }

  accessMethod() {
    this.setState({hasAccount: !this.state.hasAccount});
  }

  render() {
    return (
      <View style={styles.container}>
        {binaryRender(this.state.hasAccount, <Login />, <Signup />)}
        <TouchableOpacity style={styles.textBtn} onPress={this.accessMethod.bind(this)}>
            <Text style={styles.bold}>{this.state.hasAccount ? 'Create Account' : 'Login Account'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Auth;