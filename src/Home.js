//Landing Page after authentication.
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';
import axios from 'axios'; //axios for AJAX calls
import Modal from 'react-native-modal';
import { binaryRender, getToken, getData } from './_util.js';
import { Actions } from 'react-native-router-flux';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './_actions';
/* import api configurations */
import { path, api } from './_config.js';
/* import custom components */
import MainNav from './MainNav.js';
import DisplayElements from './components_home/DisplayElements.js';
import ModalCreate from './components_home/ModalCreate.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: [],
      isLoaded: true, //toggled when the app has loaded the necessary data to display
      token: null, //state to contain the user's JSON webtoken for quick authentication
      userData: null, //state to hold non-sensitive user account data
      view: this.props.view, //toggles between Character list and Games list; default is characters
      showModal: false, //toggle for modal views
      characters: [], //array to contain character entries
      games: [], //array to contain game entries
      currencySystems: [], //array to hold a user's currency systems
    };
  }

  switchView() { //toggles between Character and Game views
    this.setState({view: !this.state.view});
  }

  createNew() { //method to open the CreateNew modal, sent to the MainNav component
    this.getSystems(); //load the most recent currency systems
    this.setState({showModal: true}); //open the modal
  }

  getSystems() { //AJAX call to get currency systems
    axios.get(path+api.currency.systems, {
      params: {
        userId: this.state.userData.id
      }
    })
      .then(res => {
        let data = res.data;
        this.setState({currencySystems: data});
      })
      .catch(error => console.error(error));
  }

  getChars() { //populates the component with character data
    axios.get(path+api.char.all+'?userId='+this.state.userData.id)
      .then(res => {
        let data = res.data;
        this.setState({characters: data});
      })
      .catch(error => console.error(error));
  }

  getGames() { //populates the component with game data
    axios.get(path+api.game.all+'?userId='+this.state.userData.id)
      .then(res => {
        let data = res.data;
        this.setState({games: data})
      })
      .catch(error => console.error(error));
  }

  updateList(target, entry) {
    let list = this.state[target].concat(entry);

    if (target === 'characters') {
      this.setState({characters: list});
    } else if (target === 'games') {
      this.setState({games: list});
    }
  }

  closeModal() { //method to close the current modal, sent to the ModalCreate component
    this.setState({showModal: false});
  }

  componentDidMount() {
    getToken(this.setState.bind(this)) //bind the setState function as a callback to the getToken helper
      .then(() => {
        this.getChars(); //grab most recent character data
        this.getGames(); //grab most recent game data
      })
      .then(() => getData('accountData', this.setState.bind(this)))
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.props)
    if (!this.state.isLoaded) {
      return (
        <View style={s.indicate}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={s.container}>
          <MainNav
            view={this.state.view}
            controls={[ //MainNav's "controls" property takes an array of objects to render each button on the left side of the bar
                {callback: this.switchView.bind(this), text: (this.state.view ? 'Games' : 'Characters')},
                {callback: this.createNew.bind(this), text: 'Add'}
              ]}
            switchView={this.switchView.bind(this)}
            createNew={this.createNew.bind(this)}
          />

          <DisplayElements //Display for all characters or games, depending on which is currently in view
            characters={this.state.characters}
            games={this.state.games}
            view={this.state.view}
            userData={this.state.userData}
            token={this.state.token}
          />

          <Modal isVisible={this.state.showModal}>
            <View>
              <ModalCreate //Modal for creating new Characters or Games
                userData={this.state.userData}
                currencySystems={this.state.currencySystems}
                updateList={this.updateList.bind(this)}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {account: state.account};
}

// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
  indicate: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});