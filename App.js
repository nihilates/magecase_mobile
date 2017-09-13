/* Main App Container */
import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, TouchableHighlight, View, Text} from 'react-native';
// import {Router, Scene} from 'react-native-router-flux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
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
const mapStateToProps = state => {return {
  token: state.token,
}};

/* Component Body */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    loadFile('session', this.props.setToken) //load the session token, if one exists. If not, it will return null and a Redux store will not be updated
      .then(() => {
        this.setState({ isLoaded: true });
      })
  }

  render() {
    /* Set Navigation */
    const Navigation = StackNavigator(
      {
        Auth: { screen: Auth },
        Home: { screen: Home },
        CharDetails: { screen: CharDetails },
        GameDetails: { screen: GameDetails },
      },
      {
        initialRouteName: (this.props.token ? 'Home' : 'Auth'), //if a session token exists, start at "Home", otherwise start at "Auth"
      },
    );

    if (!this.state.isLoaded) {
      return <ActivityIndicator style={{'flex': 1}} />
    } else {
      return <Navigation />
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);