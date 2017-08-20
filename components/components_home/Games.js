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

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      games: [],
    };
  }

  navGameDetails(game) {
    Actions.GameDetails({game: game});
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
      return (
        <View style={s.container}>
          <Text style={s.title}>Games</Text>
          {this.state.games.map((game, i) => {
            return (
              <View key={i}>
                <TouchableOpacity onPress={() => {
                  this.navGameDetails(game);
                }}>
                  <Text style={s.textBtn}>{game.game_name}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      )
    }
  }
}

export default Games;

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