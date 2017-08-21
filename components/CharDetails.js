import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'; //axios for AJAX calls
import { path, api } from './_config.js';
//Import Custom Components
import CharInventory from './components_char/CharInventory.js';

class CharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      items: [],
      assets: [],
      bank: [],
      wallet: [],
    };
  }

  getInventory() { //populates the component with inventory data
    axios.get(path+api.inventory.all, {
      params: {
        charId: this.props.subject.id
      }
    })
      .then(res => {
        let data = res.data;
        this.setState({items: data});
      })
      .catch(error => console.error(error));
  }

  backHome() {
    Actions.Home({view: true});
  }

  componentDidMount() {
    this.getInventory();
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>{this.props.subject.char_name}</Text>

        <CharInventory
          character={this.props.subject}
          items={this.state.items}
        />

        <TouchableOpacity onPress={this.backHome.bind(this)}>
          <Text style={s.textBtn}> Back </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default CharDetails;


const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
  input: {
    height: 50,
    width: 190,
  },
  textBtn: {
    fontWeight: 'bold',
    marginBottom: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});