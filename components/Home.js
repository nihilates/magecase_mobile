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
import axios from 'axios'; //axios for AJAX calls
import Modal from 'react-native-modal';
//import api configurations
import { path, api } from './_config.js';
/*import custom components*/
import MainNav from './MainNav.js';
import DisplayElements from './components_home/DisplayElements.js';
// import Characters from './components_home/Characters.js';
// import Games from './components_home/Games.js';
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
      currencySystems: [],
    };
  }

  switchView() {
    this.setState({view: !this.state.view});
  }

  createNew() { //method to open the CreateNew modal, sent to the MainNav component
    this.getSystems();
    this.setState({showModal: true});
  }

  getSystems() {
    axios.get(path+api.currency.systems+'?userId='+this.state.userData.id)
      .then(res => {
        let data = res.data;
        this.setState({currencySystems: data});
      })
      .catch(error => console.error(error));
  }

  closeModal() { //method to close the current modal, sent to the ModalCreate component
    this.setState({showModal: false});
    getToken(this.setState.bind(this));
  }

  componentWillMount() {
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

          <DisplayElements view={this.state.view} userData={this.state.userData} token={this.state.token} />

          <Modal isVisible={this.state.showModal}>
            <View>
              <ModalCreate
                userData={this.state.userData}
                currencySystems={this.state.currencySystems}
                view={this.state.view}
                closeModal={this.closeModal.bind(this)}
              />
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

/*
          {binaryRender(this.state.view,
            <Characters userData={this.state.userData} token={this.state.token} />,
            <Games userData={this.state.userData} token={this.state.token} />
          )}
*/