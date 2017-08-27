import React, { Component } from 'react';
import {
  Picker,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
import DropdownMenu from '.././components_misc/DropdownMenu.js';
import axios from 'axios'; //axios for AJAX calls
import { chkForm } from '../_util.js';
//import api configurations
import { path, api } from '../_config.js';


class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getItems() { //populates the component with item data
    axios.get(path+api.item.all, {
      params: {
        charId: this.props.subject.id
      }
    })
      .then(res => {
        let data = res.data;
        this.setState({items: data});
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <View style={s.container}>
        <Text>Add Item</Text>
        <SimpleBtn callback={this.props.closeModal} buttonText="Close"/>
      </View>
    )
  }
}

export default AddItem;

const s = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});