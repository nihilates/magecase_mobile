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
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios'; //axios for AJAX calls
//import api configurations
import { path, api } from '../_config.js';

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: null, //name for character or game
      selectedSystem: null, //currency system to be associated with character or game
    };
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>{this.props.view ? 'New Character' : 'New Game'}</Text>
        <View>
          <TextInput
            editable={true}
            autoCorrect={false}
            maxLength={25}
            onChangeText={(selectedName) => this.setState({selectedName})}
            placeholder={this.props.view ? 'Enter Character Name' : 'Enter Game Name'}
            ref='selectedName'
            returnKeyType='next'
            style={s.input}
            value={this.state.selectedName}
          />
        </View>
        <ModalDropdown
          defaultValue="Select Currency System"
          options={this.props.currencySystems.map(system => {
            return system.system_name
          })}
          onSelect={(index) => {
            console.log(this.props.currencySystems[index])
            this.setState({selectedSystem: this.props.currencySystems[index].id})
          }}
        />

        <Text>{JSON.stringify(this.state)}</Text>

        <TouchableOpacity onPress={this.props.closeModal}>
            <Text style={s.textBtn}> Cancel </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ModalCreate;

const s = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(180, 80%, 100%)',
    // width: '90%',
    // height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  indicate: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    backgroundColor: 'hsla(180, 80%, 100%, 0.5)',
    width: '90%',
    height: 300,
  },
  textBtn: {
    fontWeight: 'bold',
    padding: 5,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    width: 190,
  },
});