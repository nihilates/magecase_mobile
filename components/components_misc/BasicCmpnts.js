//Basic versions of repeated components that are written to be modular based on what properties they are given
import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class SimpleBtn extends Component {
  constructor(props) {super(props)}

  render() {
    return (
      <TouchableOpacity onPress={this.props.callback}>
        <Text style={s.textBtn}>{this.props.buttonText}</Text>
      </TouchableOpacity>
    )
  }
}

// class Test extends Component {
//   constructor(props) {super(props)}

//   render() {
//     return (
//       <Text>And I'm Here Too</Text>
//     )
//   }
// }

module.exports = {
  SimpleBtn,
}

const s = StyleSheet.create({
  textBtn: {
    fontWeight: 'bold',
    padding: 5
  }
});