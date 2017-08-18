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

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.modContainer}>
        <Text style={styles.title}>{this.props.item.item_name}</Text>
        <View>
          <Text>Dice Size: {this.props.item.dice_type} sides</Text>
          <Text>Dice Count: {this.props.item.dice_count} per hit</Text>
          <Text>Damage Type: {this.props.item.damageType}</Text>
          <Text>Properties: {this.props.item.properties}</Text>
          <Text>Weight: {this.props.item.weight} lbs</Text>
          <Text>Value: {this.props.item.value} gp</Text>
        </View>

        <TouchableOpacity style={styles.textBtn} onPress={this.props.closeModal}>
            <Text style={styles.bold}> Close </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ItemDetails;