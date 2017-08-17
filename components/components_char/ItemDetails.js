import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../_styles.js';
//import api configurations
import { path, api } from '../_config.js';

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      // mainType: ''
    };
  }

  // componentDidMount() {
  //   fetch(path+api.item.type+'?typeId=1')
  //   .then(resp => resp.json())
  //   .then(data => this.setState({mainType: data.type_name}))
  //   .done();
  // }

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