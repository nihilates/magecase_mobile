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
import axios from 'axios';
//import api configurations
import { path, api } from '../_config.js';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      characters: [],
    };
  }

  componentDidMount() {
    axios.get(path+api.char.all+'?userId='+this.props.userData.id)
      .then(res => {
        let data = res.data;
        this.setState({characters: data, isLoaded: true})
      });
  }

  render() {
    console.log(this.state)

    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <View style={s.container}>
          <Text style={s.title}>Characters</Text>
          {this.state.characters.map((char, i) => {
            return <Text key={i}>{char.char_name}</Text>
          })}
        </View>
      )
    }
  }
}

export default Characters;

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
});