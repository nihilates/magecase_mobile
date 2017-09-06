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
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
import axios from 'axios'; //axios for AJAX calls
//import api configurations
import { path, api } from '../_config.js';

class DisplayElements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //navigates to proper details page, passing the selected element's data into the props of the Details component
  //if props.view is "true" then we are managing Character data. Otherwise, we are managing Game data
  navigate(element) {
    (this.props.view ? Actions.CharDetails : Actions.GameDetails)({subject: element})
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>{this.props.view ? "Characters" : "Games"}</Text>
        {(this.props.view ? this.props.characters : this.props.games).map((element, i) => {
          return <SimpleBtn key={i} callback={() => this.navigate(element)} buttonText={this.props.view ? element.char_name : element.game_name} />
        })}
      </View>
    )
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