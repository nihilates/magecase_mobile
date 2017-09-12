import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, TouchableHighlight, View, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './src/_actions';
/* Utility Functions */
import { loadFile } from './src/_utility/storageUtils.js';
/* Import Component Pages */
import Auth from './src/Auth.js';
import Home from './src/Home.js';
import CharDetails from './src/CharDetails.js';
import GameDetails from './src/GameDetails.js';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    token: state.token,
    account: state.account,
    assets: state.assets,
    characters: state.characters,
    currencySystems: state.currency,
    games: state.games,
    itemTypes: state.itemTypes,
    items: state.items,
    shopTypes: state.shopTypes,
    shops: state.shops,
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      isLoaded: false,
    };
  }

  componentDidMount() { //TODO: Split the Account state into sub states based on their keys
    loadFile('session', this.props.setToken)
      .then(() => loadFile('accountData', this.props.setAccount))
      .then(() => {
        if (this.props.account) { //if an account was found...
          //TODO: Refactor this body of bindings into a helper function
          this.props.setAssets(this.props.account.asset_types);
          this.props.setChars(this.props.account.characters);
          this.props.setCurrency(this.props.account.currency_systems);
          this.props.setGames(this.props.account.games);
          this.props.setItemTypes(this.props.account.item_types);
          this.props.setItems(this.props.account.items);
          this.props.setShopTypes(this.props.account.shop_types);
          this.props.setShops(this.props.account.shops);
        }
      })
      .then(() => this.setState({ hasData: (this.props.token !== null && this.props.account !== null), isLoaded: true }) )
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return(
        <Router>
          <Scene key='root'>
            <Scene
              component={Auth}
              hideNavBar={true}
              initial={!this.state.hasData}
              key='Auth'
              title='Authentication'
            />
            <Scene
              component={Home}
              hideNavBar={true}
              initial={this.state.hasData}
              view={true} //defaults the landing page to Character; Allows a psuedo memory of last visited page
              token={this.state.token}
              key='Home'
              title='Home Page'
            />
            <Scene
              component={CharDetails}
              hideNavBar={true}
              key='CharDetails'
              title='Character Details'
            />
            <Scene
              component={GameDetails}
              hideNavBar={true}
              token={this.state.token}
              key='GameDetails'
              title='Game Details'
            />
          </Scene>
        </Router>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);