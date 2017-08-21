import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
//IMPORT PAGES//
import Auth from './components/Auth.js';
import Home from './components/Home.js';
import CharDetails from './components/CharDetails.js';
import GameDetails from './components/GameDetails.js';
import Items from './components/Items.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      isLoaded: false,
      token: null,
      userData: null,
    };
  }

  async componentDidMount() {
    //get the token, if one exists
    await AsyncStorage.getItem('session').then(session => {
      this.setState({ hasData: session !== null, isLoaded: true });
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
            <Scene
              component={Items}
              hideNavBar={true}
              token={this.state.token}
              key='Items'
              title='Items'
            />
          </Scene>
        </Router>
      )
    }
  }
}

export default App;