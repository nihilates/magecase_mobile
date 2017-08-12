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
//Set and Configure Styles
import styles from './_styles.js';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  userLogin() {
    Actions.Home();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Authentication Page</Text>

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

        <TouchableOpacity onPress={this.userLogin.bind(this)}>
            <Text style={styles.body}> Log In </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Auth;