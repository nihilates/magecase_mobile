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
//import api configurations
import { path, api } from '../_config.js';


class ItemCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selection.count,
    };
  }

  changeValue(num) {
    this.setState({value: this.state.value+num});
  }

  render() {
    return (
      <View style={s.container}>
        <View style={s.controls}>
          <SimpleBtn callback={() => this.changeValue(-1)} buttonText="-"/>

          <TextInput
            editable={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            onChangeText={(count) => this.setState({value: Number(count)})}
            ref='count'
            returnKeyType='next'
            keyboardType='numeric'
            style={s.input}
            value={this.state.value.toString()}
          />

          <SimpleBtn callback={() => this.changeValue(1)} buttonText="+"/>
        </View>

        <SimpleBtn
          callback={() => {
            this.props.updateCount({id: this.props.selection.id, count: this.state.value});
            this.props.closeModal();
          }}
          buttonText="Save"
        />

        <SimpleBtn callback={this.props.closeModal} buttonText="Cancel"/>
      </View>
    )
  }
}

export default ItemCount;

const s = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    height: 25,
    width: 60,
  },
});