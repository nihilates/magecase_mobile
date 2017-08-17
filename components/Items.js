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
import Modal from 'react-native-modal';
import styles from './_styles.js';
//import api configurations
import { path, api } from './_config.js';
//import custom components
import ItemDetails from './components_char/ItemDetails.js';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      modalVisible: false,
      modalData: {}
    };
  }

  backHome() {
    Actions.Home();
  }

  openModal() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  setModalData(data) {
    this.setState({modalData: data})
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
    .then(data => this.setState({items: data, modalData: data[0]}))
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
                  <TouchableOpacity style={styles.scroll}
                    onPress={()=> {
                      this.setModalData(item);
                      this.openModal();
                    }
                  }>
                      <Text style={styles.bold}>{item.item_name}</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>

          <TouchableOpacity style={styles.textBtn} onPress={this.backHome.bind(this)}>
              <Text style={styles.bold}> Back </Text>
          </TouchableOpacity>

          <Modal isVisible={this.state.modalVisible}>
            <View>
              <ItemDetails
                closeModal={this.closeModal.bind(this)}
                item={this.state.modalData}
              />
            </View>
          </Modal>
        </View>
    )}
  }
}

export default Items;