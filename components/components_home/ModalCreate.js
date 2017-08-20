import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import api configurations
import { path, api } from '../_config.js';

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Element</Text>
        <View>
          <Text>Modal Here</Text>
        </View>

        <TouchableOpacity style={styles.textBtn} onPress={this.props.closeModal}>
            <Text style={styles.bold}> Close </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ModalCreate;