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
import { binaryRender, getToken } from './_util.js';
import Modal from 'react-native-modal';
//import api configurations
import { path, api } from './_config.js';
/*import custom components*/
import MainNav from './MainNav.js';
import Characters from './components_home/Characters.js';
import Games from './components_home/Games.js';
import ModalCreate from './components_home/ModalCreate.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      token: null,
      userData: null,
      view: this.props.view, //toggles between Character list and Games list; default is characters
      showModal: false,
    };
  }

  switchView() {
    this.setState({view: !this.state.view});
  }

  createNew() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  componentDidMount() {
    getToken(this.setState.bind(this));
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
          <MainNav view={this.state.view} switchView={this.switchView.bind(this)} createNew={this.createNew.bind(this)}/>

          {binaryRender(this.state.view,
            <Characters userData={this.state.userData} token={this.state.token} />,
            <Games userData={this.state.userData} token={this.state.token} />
          )}

          <Modal isVisible={this.state.showModal}>
            <View>
              <ModalCreate closeModal={this.closeModal.bind(this)} />
            </View>
          </Modal>
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