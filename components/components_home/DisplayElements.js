//Display component of characters belonging to a logged in user
import React, { Component } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'; //axios for AJAX calls
//import api configurations
import { path, api } from '../_config.js';

class DisplayElements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      characters: [],
      games: [],
    };
  }

  navigate(element) { //navigates to character details page, passing the selected character data into the props of the CharDetails component
    Actions.CharDetails({subject: element});
  }

  getChars() { //populates the component with character data
    axios.get(path+api.char.all+'?userId='+this.props.userData.id)
      .then(res => {
        let data = res.data;
        this.setState({characters: data, isLoaded: true});
      })
      .catch(error => console.error(error));
  }

  getGames() { //populates the component with game data
    axios.get(path+api.game.all+'?userId='+this.props.userData.id)
      .then(res => {
        let data = res.data;
        this.setState({games: data, isLoaded: true})
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getChars();
    this.getGames();
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={s.indicate}>
          <ActivityIndicator />
        </View>
      )
    } else {
      console.log(this.state)
      return (
        <View style={s.container}>
          <Text style={s.title}>{this.props.view ? "Characters" : "Games"}</Text>
          {(this.props.view ? this.state.characters : this.state.games).map((element, i) => {
            return (
              <View key={i}>
                <TouchableOpacity onPress={() => {
                  this.navigate(element);
                }}>
                  <Text style={s.textBtn}>{this.props.view ? element.char_name : element.game_name}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      )
    }
  }
}

export default DisplayElements;

const s = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'hsla(180, 80%, 100%, 0.5)',
    width: '90%',
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  indicate: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    backgroundColor: 'hsla(180, 80%, 100%, 0.5)',
    width: '90%',
    height: 300,
  },
  textBtn: {
    fontWeight: 'bold',
    padding: 5,
    flexDirection: 'row',
  },
});