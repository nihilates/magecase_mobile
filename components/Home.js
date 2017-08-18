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
      view: true, //toggles between Character list and Games list; default is characters
    };
  }

  switchView() {
    this.setState({view: !this.state.view});
  }

  render() {
    return (
      <View style={s.container}>
        <MainNav view={this.state.view} switchView={this.switchView.bind(this)}/>
        {binaryRender(this.state.view,<Characters token={this.props.token}/>,<Games token={this.props.token}/>)}
      </View>
    )
  }
}

export default Home;

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
  comp: {
    marginTop: 20
  }
});