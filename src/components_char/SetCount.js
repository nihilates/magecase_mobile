/* Component to Control Quantity of Items */
import React, { Component } from 'react';
import {
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
/* Helper Functions */
import { deepRemove, updateEntry, addTo, removeFrom } from '../_data/manageData.js';
import { displayMatch } from '../_utility/dataUtils.js';
import { binaryRender } from '../_utility/generalUtils.js';
import { replaceFile } from '../_utility/storageUtils.js';
/* Import API Config */
import axios from 'axios'; //axios for AJAX calls
import { path, api } from '../_config.js';
/* Import Custom Components */
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
import DropdownMenu from '.././components_misc/DropdownMenu.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    account: state.account,
    selectedChar: state.selectedChar,
    selectedEntry: state.selectedEntry,
    items: state.items,
  }
};

/* Component Body */
class SetCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: displayMatch(this.props.items, 'id', this.props.selectedEntry.itemId),
      inventoryId: this.props.selectedEntry.id,
      count: this.props.selectedEntry.count || 1,
      minimum: this.props.minimum || 0,
      maximum: this.props.maximum || 9999,
    };
  }

  changeValue(num) {
    let newVal = this.state.count+num;
    if (newVal>=this.state.minimum) this.setState({ count: newVal });
  }

  addEntry() {
    var entry = null;
    axios.post(path+api.inventory.add, {
      charId: this.props.selectedChar.id,
      itemId: this.props.entry.id,
      count: this.state.count
    })
    .then(resp => entry = resp.data)
    .catch(error => console.log(error) );

    addTo(this.props.selectedChar.inventories, this.props.entry, this.state.count, this.props.selectedChar, entry)
    replaceFile('accountData', this.props.account); //save the newly updated account details with AsyncStorage
    this.props.closeModal(); //close the modal
  }

  updateCount() { //Method to update entry count both locally and on the server
    axios.put(path+api.inventory.update, {
      charId: this.props.selectedChar.id,
      id: this.props.selectedEntry.id,
      count: this.state.count
    })
    .catch(error => console.log(error));

    updateEntry(this.props.selectedEntry, 'count', this.state.count); //update the entry in the Redux state
    replaceFile('accountData', this.props.account); //save the newly updated account details with AsyncStorage
    this.props.closeModal(); //close the modal
  }

  confirmDelete() { //Method to confirm from the user if they intend to delete an item from the inventory
    Alert.alert(
      'Delete Item?',
      '',
      [
        {text: 'Yes', onPress: () => { //if "Yes" is pressed, proceed to next step...
          axios.delete(path+api.inventory.remove, {
            data: {
              charId: this.props.selectedChar.id,
              id: this.props.selectedEntry.id
            }
          })
          .catch(error => console.log(error));

          removeFrom(this.props.selectedChar.inventories, 'id', this.props.selectedEntry.id);
          replaceFile('accountData', this.props.account); //save the newly updated account details with AsyncStorage
          this.props.closeModal(); //close the modal
        }},
        {text: 'Cancel', onPress: () => {} } //if "Cancel" is pressed, do nothing
      ]);
  }

  render() {
    console.log('Set Count Props', this.props)
    return (
      <View style={s.container}>
        <View>
          {binaryRender(this.props.topText,(
            <Text>{this.props.topText}</Text>
          ), null)}
        </View>

        <View style={s.controls}>
          <SimpleBtn callback={() => this.changeValue(-1)} buttonText="-"/>

          <TextInput
            editable={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            onChangeText={(count) => this.setState({count: Number(count)})}
            ref='count'
            returnKeyType='next'
            keyboardType='numeric'
            style={s.input}
            value={this.state.count.toString()}
          />

          <SimpleBtn callback={() => this.changeValue(1)} buttonText="+"/>
        </View>

        <SimpleBtn
          callback={() => {
            this.props.addEntry ? this.addEntry() : (this.state.count <=0 ? this.confirmDelete() : this.updateCount())
            }
          }
          buttonText="Confirm"
        />

        {binaryRender(this.props.removeEntry,(
          <SimpleBtn
            callback={() => this.confirmDelete()}
            buttonText="Delete"
          />
        ), null)}

        <SimpleBtn callback={this.props.closeModal} buttonText="Cancel" />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetCount);

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
    height: 50,
    width: 60,
  },
});