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

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Actions.Auth();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={s.container}>
        <View>
          <Text>Other</Text>
        </View>

        <View>
          <TouchableOpacity onPress={this.userLogout.bind(this)}>
              <Text style={s.textBtn}> Log Out </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default MainNav;

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'hsla(180, 80%, 100%, 0.5)',
    width: '90%',
    height: 60,
  },
  textBtn: {
    fontWeight: 'bold',
    padding: 10,
  },
});