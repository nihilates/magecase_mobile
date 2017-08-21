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
import DropdownMenu from '.././components_misc/DropdownMenu.js';
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

    this.submitData = this.submitData.bind(this);
  }

  submitData() {
    axios.post(path+api.char.create, {
      userId: this.props.userData.id,
      char_name: this.state.selectedName,
      currencyId: this.state.selectedSystem
    })
    .then(res => console.log(res))
    .catch(error => console.error(error));
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>{this.props.view ? 'New Character' : 'New Game'}</Text>

        <View style={s.forms}>
          <TextInput
            editable={true}
            autoCorrect={false}
            maxLength={20}
            onChangeText={(selectedName) => this.setState({selectedName})}
            placeholder={this.props.view ? 'Enter Character Name' : 'Enter Game Name'}
            ref='selectedName'
            returnKeyType='next'
            style={s.input}
            value={this.state.selectedName}
          />
        </View>
      <DropdownMenu
          defaultValue="Select Currency System"
          options={this.props.currencySystems.map(system => {
            return system.system_name
          })}
          onSelect={(index) => {
            this.setState({selectedSystem: this.props.currencySystems[index].id})
          }}
        />

        <TouchableOpacity onPress={() => {
          this.submitData()
          this.props.closeModal()
        }}>
            <Text style={s.textBtn}> Submit </Text>
        </TouchableOpacity>

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
        flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
  forms: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});