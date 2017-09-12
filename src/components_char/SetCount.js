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
import { displayMatch } from '../_utility/dataUtils.js';
import { binaryRender } from '../_utility/generalUtils.js';
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
      count: this.props.selectedEntry.count,
      minimum: this.props.minimum || 0,
      maximum: this.props.maximum || 9999,
    };
  }

  changeValue(num) {
    let newVal = this.state.count+num;
    if (newVal>=this.state.minimum) this.setState({count: newVal});
  }

  addEntry() {
    this.props.addEntry(this.state.itemId, this.state.count);
    this.props.closeModal();
  }

  updateCount() {
    this.props.updateCount(this.state.inventoryId, this.state.count);
    this.props.closeModal();
  }

  confirmDelete() {
    Alert.alert(
      'Delete Item?',
      '',
      [
        {text: 'Okay', onPress: () => {
          this.props.removeEntry(this.state.inventoryId);
          this.props.closeModal();
        }},
        {text: 'Cancel', onPress: () => {} }
      ]);
  }

  render() {
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