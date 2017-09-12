import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux'; //Actions from router-flux for changing pages between components
/* Helper Functions */
import { binaryRender } from './_utility/generalUtils.js'; //binaryRender helper function allows boolean rendering of 2 different components
/* Import Custom Components */
import { SimpleBtn } from './components_misc/BasicCmpnts.js';
import Login from './components_auth/Login.js';
import Signup from './components_auth/Signup.js';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccount: true //if hasAccount is "true", shows login page. Otherwise, it shows signup page
    };
  }

  accessMethod() { //Method to pass into the props of the "Create Account"/"Login Account" button to allow toggle
    this.setState({hasAccount: !this.state.hasAccount});
  }

  render() {
    return (
      <View style={s.container}>
        {binaryRender(this.state.hasAccount, <Login />, <Signup />)}
        <SimpleBtn
          callback={this.accessMethod.bind(this)}
          buttonText={this.state.hasAccount ? 'Create Account' : 'Login Account'} //Button text depends on hasAccount state
        />
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
});