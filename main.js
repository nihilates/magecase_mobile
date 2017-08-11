import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { api } from './components/config.js'; //import configuration data

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    //test that the server can be called on
    fetch(api.path+'items')
      .then(resp => resp.json())
      .then(data => this.setState({data}))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Response from Server:
        </Text>
        <Text style={styles.instructions}>
          {this.state.data.length + " items found."}
        </Text>
        <Text style={styles.instructions}>
          How's that then?
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});