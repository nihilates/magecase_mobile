//Landing Page after authentication.
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { binaryRender } from './_util.js';
//import api configurations
import { path, api } from './_config.js';
/*import custom components*/
import MainNav from './MainNav.js';
import Characters from './components_home/Characters.js';
import Games from './components_home/Games.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      token: null,
      userData: null,
      view: true, //toggles between Character list and Games list; default is characters
      elements: [], //empty array to store element data, such as characters or games to list
    };
  }

  switchView() {
    this.setState({view: !this.state.view});
  }

  async componentDidMount() {
    //get the token, if one exists
    await AsyncStorage.getItem('session').then(session => {
      let data = JSON.parse(session);
      let idToken = data !== null ? data.auth.id_token : null;
      let user = data !== null ? data.userData : null;

      this.setState({ token: idToken, userData: user, isLoaded: true });
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={s.indicate}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={s.container}>
          <MainNav view={this.state.view} switchView={this.switchView.bind(this)}/>
          {binaryRender(this.state.view,
            <Characters userData={this.state.userData} token={this.state.token}/>,
            <Games userData={this.state.userData} token={this.state.token}/>)}
        </View>
      )
    }
  }
}

export default Home;

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
  comp: {
    marginTop: 20
  },
  indicate: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});