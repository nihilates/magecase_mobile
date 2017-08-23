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


class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: '', //name for character or game
      selectedSystem: '', //currency system to be associated with character or game
    };

    this.submitData = this.submitData.bind(this);
  }

  submitData() {
    let body = {
      userId: this.props.userData.id,
      currencyId: this.state.selectedSystem,
    };
    body[(this.props.view ? 'char_name' : 'game_name')] = this.state.selectedName;
    if (!chkForm(body)) {
      return;
    } else {
      axios.post(path+(this.props.view ? api.char.create : api.game.create), body)
      .then(res => this.props.updateList((this.props.view ? 'characters' : 'games'), res.data))
      .catch(error => console.error(error));

      this.props.closeModal();
    }
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

        <SimpleBtn callback={this.submitData} buttonText="Submit"/>
        <SimpleBtn callback={this.props.closeModal} buttonText="Cancel" />
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