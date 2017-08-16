//Very temporary component mostly for testing purposes
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './_styles.js';
//import api configurations
import { path, api } from './_config.js';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: []
    };
  }

  backHome() {
    Actions.Home();
  }

  async componentDidMount() {
    var token = null;
    await AsyncStorage.getItem('id_token').then(result => {
      token = result;
      this.setState({isLoaded: true});
    });
    fetch(path+api.user.items, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({items: data}))
    .done();
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return(
        <View style={styles.container}>
          <Text style={styles.title}>Items</Text>

          <ScrollView>
            {this.state.items.map((item, i) => {
              return (
                <View key={i}>
                  <Text style={styles.bold}>{item.item_name} deals {item.dice_count} d{item.dice_type} {item.damageType} damage </Text>
                </View>
              )
            })}
          </ScrollView>

          <TouchableOpacity style={styles.textBtn} onPress={this.backHome.bind(this)}>
              <Text style={styles.bold}> Back </Text>
          </TouchableOpacity>
        </View>
    )}
  }
}

export default Items;