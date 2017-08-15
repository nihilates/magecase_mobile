import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
//IMPORT PAGES//
import Auth from './components/Auth.js';
import Register from './components/Register.js';
import Home from './components/Home.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasToken: false,
      isLoaded: false,
      token: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('id_token').then(token => {
      console.log('APP TOKEN:',token);
      this.setState({ hasToken: token !== null, isLoaded: true, token: token} );
    });
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
              initial={!this.state.hasToken}
              token={this.state.token}
              key='Auth'
              title='Authentication'
            />
            <Scene
              component={Register}
              hideNavBar={true}
              key='Register'
              title='Register'
            />
            <Scene
              component={Home}
              hideNavBar={true}
              initial={this.state.hasToken}
              token={this.state.token}
              key='Home'
              title='Home Page'
            />
          </Scene>
        </Router>
      )
    }
  }
}

export default App;