//Landing Page after authentication.
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
//import api configurations
import { path, api } from './_config.js';
//import custom components
import MainNav from './MainNav.js';
import Characters from './components_home/Characters.js';
import HomeNav from './components_home/HomeNav.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Actions.Auth();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  getProtected() {
    fetch(path+api.user.test, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      this.setState({accounts: data});
    })
    .done();
  }

  navChar() { //Temporary Nav button for testing purposes
    Actions.CharDetails();
  }

  navGame() { //Temporary Nav button for testing purposes
    Actions.GameDetails();
  }

  navItems() { //Temporary Nav button for testing purposes
    Actions.Items();
  }

  render() {
    return (
      <View style={s.container}>
        <MainNav />
        <HomeNav />
        <Text style={s.title}>Home Page</Text>
        <Characters />

        <TouchableOpacity onPress={this.navItems.bind(this)}>
            <Text style={s.textBtn}> Items </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navChar.bind(this)}>
            <Text style={s.textBtn}> Characters </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navGame.bind(this)}>
            <Text style={s.textBtn}> Games </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default Home;

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
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