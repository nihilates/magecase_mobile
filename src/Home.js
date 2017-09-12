/* Landing Page After Authentication */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux'; //router navigation
import axios from 'axios'; //axios for AJAX calls
/* Utility Functions */
import { loadFile } from './_utility/storageUtils.js';
/* Import API Config */
import { path, api } from './_config.js';
/* Import Custom Components */
import Modal from 'react-native-modal';
import MainNav from './MainNav.js';
import DisplayElements from './components_home/DisplayElements.js';
import ModalCreate from './components_home/ModalCreate.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    token: state.token,
    account: state.account,
    assets: state.assets,
    characters: state.characters,
    currencySystems: state.currencySystems,
    games: state.games,
    itemTypes: state.itemTypes,
    items: state.items,
    shopTypes: state.shopTypes,
    shops: state.shops,
  };
};

/* Component Body */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false, //toggled when the app has loaded the necessary data to display
      view: this.props.view, //toggles between Character list and Games list; default is characters
      showModal: false, //toggle for modal views
    };
  }

  switchView() { //toggles between Character and Game views
    this.setState({view: !this.state.view});
  }

  createNew() { //method to open the CreateNew modal, sent to the MainNav component
    this.setState({showModal: true}); //open the modal
  }

  closeModal() { //method to close the current modal, sent to the ModalCreate component
    this.setState({showModal: false});
  }

  componentDidMount() {
    if (this.props.account_login && !this.props.account) {
      this.props.setAccount(this.props.account_login)
      //TODO: Refactor this body of bindings into a helper function
      this.props.setAssets(this.props.account_login.asset_types);
      this.props.setChars(this.props.account_login.characters);
      this.props.setCurrency(this.props.account_login.currency_systems);
      this.props.setGames(this.props.account_login.games);
      this.props.setItemTypes(this.props.account_login.item_types);
      this.props.setItems(this.props.account_login.items);
      this.props.setShopTypes(this.props.account_login.shop_types);
      this.props.setShops(this.props.account_login.shops);

      this.setState({isLoaded: true});
    } else {
      this.setState({isLoaded: this.props.account !== null});
    }
  }

  render() {
    console.log(this.props.account)
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
            view={this.state.view}
          />

          <Modal isVisible={this.state.showModal}>
            <View>
              <ModalCreate //Modal for creating new Characters or Games
                view={this.state.view}
                closeModal={this.closeModal.bind(this)}
              />
            </View>
          </Modal>

        </View>
      )
    }
  }
};

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