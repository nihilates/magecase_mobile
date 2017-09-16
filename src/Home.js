/* Landing Page After Authentication */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';
/* Helper Functions */
import { buildAccount } from './_data/buildAccount.js';
import { displayMatch } from './_utility/dataUtils.js';
import { addCharacter } from './_data/manageData.js';
import { loadFile, replaceFile } from './_utility/storageUtils.js';
import { chkForm } from './_utility/formUtils.js';
/* Import API Config */
import axios from 'axios'; //axios for AJAX calls
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
    const { navigate } = this.props.navigation;
    this.state = {
      isLoaded: false, //toggled when the app has loaded the necessary data to display
      view: true, //toggles between Character list and Games list; default is characters
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
    this.setState({showModal: false}); //hide the modal
  }

  splitAccount(account) { //method to split the elements of props.account into their own states for individual manipulation throughout the app
    let mirror = Object.assign({}, account)
    this.props.setAssets(mirror.asset_types);
    this.props.setChars(mirror.characters);
    this.props.setCurrency(mirror.currency_systems);
    this.props.setGames(mirror.games);
    this.props.setItemTypes(mirror.item_types);
    this.props.setItems(mirror.items);
    this.props.setShopTypes(mirror.shop_types);
    this.props.setShops(mirror.shops);
  }

  componentDidMount() {
    const { navigate } = this.props.navigation; //declare navigation props to be used within sub components

    if (!this.props.account) { //if an account does not already exist in the store... (i.e. A session token already exists)
      loadFile('accountData', this.props.setAccount) //load the accountData file from AsyncStorage and set the loaded data with setAccount
        .then(() => { //and then...
          if (this.props.account) { //if the accountData loaded from AsyncStorage returned a real object...
            this.splitAccount(this.props.account); //split the data from that object with the splitAccount method
            this.setState({ isLoaded: true }); //set the "isLoaded" state to "true"; this will transition from the load wheel to the actual component
          } else { //otherwise...
            navigate('Auth'); //no accountData was found; something went wrong. Redirect user to "Auth" component
          }
        })
    } else { //otherwise... (i.e. We navigated to the "Home" component from the "Auth" component, and accountData was set from there)
      console.log('splitting')
      this.splitAccount(this.props.account); //split the data from the accountData object using the splitAccount method
      this.setState({ isLoaded: true }); //set the "isLoaded" state to "true"; this will transition from the load wheel to the actual component
    }
  }

  render() {
    console.log('HOME HAS RENDERED')
    console.log('HOME PROPS', this.props)
    const { reset, navigate } = this.props.navigation;

    if (!this.state.isLoaded) {
      return <ActivityIndicator style={{'flex': 1}} />
    } else {
      return (
        <View style={s.container}>
          <MainNav
            view={this.state.view}
            nav={navigate}
            stack={this.props.navigation.dispatch}
            controls={[ //MainNav's "controls" property takes an array of objects to render each button on the left side of the bar
                {callback: this.switchView.bind(this), text: (this.state.view ? 'Games' : 'Characters')},
                {callback: this.createNew.bind(this), text: 'Add'}
              ]}
            switchView={this.switchView.bind(this)}
            createNew={this.createNew.bind(this)}
          />

          <DisplayElements //Display for all characters or games, depending on which is currently in view
            view={this.state.view}
            characters={this.props.characters}
            games={this.props.games}
            nav={navigate}
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