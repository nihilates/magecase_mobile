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
import { binaryRender } from '../_util.js';
//import api configurations
import { path, api } from '../_config.js';


class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let entry = this.props.selection;
    return (
      <View style={s.container}>
        <View style={s.topRow}>
          <View>
            <Text>Icon</Text>
          </View>

          <View style={s.nameRow}>
            <Text style={s.title}>{entry.item.item_name}</Text>
            <Text style={s.subtext}>{entry.item.item_subtype.sub_name}</Text>
          </View>

          <View>
            <Text>x{entry.count}</Text>
          </View>
        </View>

        {binaryRender(entry.item.properties, (
          <View style={s.infoRow}>
            <Text style={s.label}>Details</Text>
            <Text>{entry.item.properties}</Text>
          </View>
        ), null)}

        {binaryRender(entry.item.description, (
          <View style={s.infoRow}>
            <Text style={s.label}>Description</Text>
            <Text>{entry.item.description}</Text>
          </View>
        ), null)}

        <View style={s.ctrlRow}>
          <SimpleBtn callback={this.props.closeModal} buttonText="Close"/>
        </View>
      </View>
    )
  }
}

export default ItemDetails;

const s = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(0, 0%, 80%)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtext: {
    fontStyle: 'italic'
  },
  label: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topRow: {
    width: '90%',
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  nameRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  infoRow: {
    width: '90%',
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'column',
    marginTop: 10,
  },
  ctrlRow: {
    width: '90%',
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});