/* Component to Display Details About An Inventory Item Selected From The CharDetails */
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
    selectedChar: state.selectedChar,
    selectedEntry: state.selectedEntry,
    items: state.items,
  }
};

/* Body of Component */
class InventoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let entry = displayMatch(this.props.items, 'id', this.props.selectedEntry.itemId);
    return (
      <View style={s.container}>
        <View style={s.topRow}>
          <View style={s.element}>
            <Text>Icon</Text>
          </View>

          <View style={s.nameRow}>
            <Text style={s.title}>{entry.item_name}</Text>
            <Text style={s.subtext}>{entry.item_subtype.sub_name}</Text>
          </View>

          <View style={s.element}>
            <Text>x{this.props.selectedEntry.count}</Text>
          </View>
        </View>

        {binaryRender(entry.properties, (
          <View style={s.infoRow}>
            <Text style={s.label}>Details</Text>
            <Text style={s.element}>{entry.properties}</Text>
          </View>
        ), null)}

        {binaryRender(entry.description, (
          <View style={s.infoRow}>
            <Text style={s.label}>Description</Text>
            <Text style={s.element}>{entry.description}</Text>
          </View>
        ), null)}

        <View style={s.ctrlRow}>
          <SimpleBtn callback={this.props.closeModal} buttonText="Close"/>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetails);

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
    width: '95%',
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
    width: '95%',
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'column',
    marginTop: 10,
  },
  ctrlRow: {
    width: '95%',
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  element: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
});