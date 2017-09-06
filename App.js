import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, TouchableHighlight, View, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
/*Import Component Pages*/
import Auth from './src/Auth.js';
import Home from './src/Home.js';
import CharDetails from './src/CharDetails.js';
import GameDetails from './src/GameDetails.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      isLoaded: false,
    };
  }

  async componentDidMount() {
    //get the token, if one exists
    await AsyncStorage.getItem('session')
      .then(session => {
        this.setState({ hasData: session !== null, isLoaded: true });
      })
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

export default App;