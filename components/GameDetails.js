import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './_styles.js';

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  backHome() {
    Actions.Home();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Game Details</Text>
        <TouchableOpacity style={styles.textBtn} onPress={this.backHome.bind(this)}>
            <Text style={styles.bold}> Back </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default GameDetails;