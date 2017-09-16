/* Modal Component To Create New Character or Game */
import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
/* Helper Functions */
import { replaceFile } from '../_utility/storageUtils.js';
import { displayMatch } from '../_utility/dataUtils.js';
import { addCharacter, mergeAll } from '../_data/manageData.js';
import { chkForm } from '../_utility/formUtils.js';
/* Import API Config */
import axios from 'axios'; //axios for AJAX calls
import { path, api } from '../_config.js';
/* Import Custom Components */
import DropdownMenu from '../components_misc/DropdownMenu.js';
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    account: state.account,
    characters: state.characters,
    currencySystems: state.currencySystems,
    games: state.games,
  }
};

class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: null, //name for character or game
      selectedSystem: null, //currency system to be associated with character or game
    };

    this.submitData = this.submitData.bind(this);
  }

  async submitData() { //method to submit a new character/game to the database
    let created = {};
    let currencySystem = displayMatch(this.props.currencySystems, 'id', this.state.selectedSystem);

    let body = {//composes the body of the POST request
      userId: this.props.account.id,
      currencySystemId: this.state.selectedSystem,
    };
    body[(this.props.view ? 'char_name' : 'game_name')] = this.state.selectedName; //depending on which view is currently selected, add the proper key for "char_name" or "game_name"

    if (!this.state.selectedName || !this.state.selectedSystem) return; //end process if all forms haven't been filled

    await axios.post(path+(this.props.view ? api.char.create : api.game.create), body) //depending on which view is currently selected, use the API path for the correct database table
      .then(resp => {
        created = resp.data;
      })
      .catch(error => console.log(error) );

    addCharacter(this.props.characters, body.char_name, body, currencySystem, created, this.props.setChars);
    replaceFile('accountData', Object.assign({}, this.props.account, { characters: this.props.characters }) );
    this.props.closeModal();
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
            return system.system_name;
          })}
          onSelect={index => {
            this.setState({selectedSystem: this.props.currencySystems[index].id})
          }}
        />

        <SimpleBtn callback={this.submitData} buttonText="Submit"/>
        <SimpleBtn callback={this.props.closeModal} buttonText="Cancel" />
      </View>
    )
  }
}

// export default ModalCreate;
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);

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