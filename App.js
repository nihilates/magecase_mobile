/* Main App Container */
import React, {Component} from 'react';
import { ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
/* Utility Functions */
import { loadFile } from './src/_utility/storageUtils.js';
/* Import Component Pages */
import Auth from './src/Auth.js';
import Home from './src/Home.js';
import CharDetails from './src/CharDetails.js';
import GameDetails from './src/GameDetails.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './src/_actions';

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
      .catch(err => console.error(err) );
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
        headerMode: 'none', //disable default headerMode from all page components
      },
    );

    if (!this.state.isLoaded) { //if the app hasn't finished loading from AsyncStorage...
      return <ActivityIndicator style={{'flex': 1}} /> //Render the ActivityIndicator
    } else { //otherwise...
      return <Navigation /> //render the Navigation component
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);