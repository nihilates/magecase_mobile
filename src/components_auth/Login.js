/* Component For Logging Into Existing Account */
import React, { Component } from 'react';
import {
  Alert,
  TextInput,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
/* Helper Functions */
import { saveFile } from '../_utility/storageUtils.js';
import { buildAccount } from '../_data/buildAccount.js';
/* Import API Config */
import axios from 'axios'; //axios for AJAX calls
import { path, api } from '../_config.js';
/* Import Custom Components */
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {return {}};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  userLogin() { //Method to submit login credentials
    if (!this.state.username || !this.state.password) return; //if there is no username OR password, return empty (do not proceed)

    axios.get(path+api.user.login, {
      params: {
        identity: this.state.username,
        password: this.state.password
      }
    })
    .then(res => {
      if (res.status === 200) { //if the response was 200...
        saveFile('session', res.data); //Save the Webtoken that gets returned upon successful login
        buildAccount({ identity: this.state.username, password: this.state.password }, this.props.setAccount) //grab all initial account data, including defaults
          .then(() => this.props.nav('Home') ) //Navigate to Home page
          .catch(err => console.error(err) );
      } else if (res.status === 204) { //if the response was 204...
        Alert.alert('Incorrect username or password', 'Please try again.'); //send alert that either a username or password was incorrect
      } else {
        Alert.alert('Something went wrong', 'Please try again later.'); //if this error is thrown, something must be wrong on the server's side
      }
    })
    .catch(error => {
      Alert.alert('Network Error', 'Server could not be reached at this time');
    });
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>Sign In</Text>

        <View>
          <TextInput //Text field to enter a username OR email address (both are accepted by the server)
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
          <TextInput //Text field for password
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

        <SimpleBtn
          callback={this.userLogin.bind(this)}
          buttonText="Login"
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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