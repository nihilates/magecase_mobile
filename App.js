import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
//IMPORT PAGES//
import Auth from './components/Auth.js';
import Home from './components/Home.js';

class App extends Component {
  constructor() {
    super();
    // this.state = {
    //   hasToken: false,
    //   isLoaded: false
    // };
  }

  // componentDidMount() {
  //   AsyncStorage.getItem('id_token').then(token => {
  //     this.setState({ hasToken: token !== null, isLoaded: true} );
  //   });
  // }

  render() {
    return(
      <Router>
        <Scene key='root'>
          <Scene
            component={Auth}
            hideNavBar={true}
            initial={true}
            key='Auth'
            title='Authentication'
          />
          <Scene
            component={Home}
            hideNavBar={true}
            initial={false}
            key='Home'
            title='Home Page'
          />
        </Scene>
      </Router>
    )
  }
}

export default App;