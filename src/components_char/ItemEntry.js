import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
import axios from 'axios'; //axios for AJAX calls


class ItemEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={s.container}>
        <SimpleBtn
          callback={() => this.props.setSelection(this.props.index, 'details')}
          buttonText={this.props.entry.item.item_name}
        />
        <SimpleBtn
          callback={() => this.props.setSelection(this.props.index, 'count')}
          buttonText={"x"+this.props.entry.count}
        />
      </View>
    )
  }
}

export default ItemEntry;

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});