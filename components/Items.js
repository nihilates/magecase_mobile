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
        <View style={s.container}>
          <Text style={s.title}>Items</Text>

          <ScrollView>
            {this.state.items.map((item, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity style={s.listItem}
                    onPress={()=> {
                      this.setModalData(item);
                      this.openModal();
                    }
                  }>
                      <Text style={s.textBtn}>{item.item_name}</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>

          <TouchableOpacity onPress={this.backHome.bind(this)}>
              <Text style={s.textBtn}> Back </Text>
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

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
  input: {
    height: 50,
    width: 190,
  },
  textBtn: {
    fontWeight: 'bold',
    marginBottom: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  listItem: {
    marginBottom: 5,
    flexDirection: 'row',
    width: 200
  },
});