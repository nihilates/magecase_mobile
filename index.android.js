import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from './main.js';

export default class Magecase extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('Magecase', () => Magecase);
