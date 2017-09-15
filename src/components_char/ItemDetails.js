/* Component to Display Item Details When Adding New Items */
import React, { Component } from 'react';
import {
  Alert,
  Picker,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
/* Helper Functions */
import { binaryRender } from '../_utility/generalUtils.js';
/* Import API Config */
import axios from 'axios'; //axios for AJAX calls
import { path, api } from '../_config.js';
/* Import Custom Components */
import SetCount from './SetCount.js';
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
  }
};

/* Component Body */
class InventoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showItemCount: false,
    };
  }

  setCount() {
    this.setState({showItemCount: true});
  }

  closeModal() {
    this.setState({showItemCount: false});
  }

  render() {
    let entry = this.props.selection;

    return (
      <View style={s.container}>
        <View style={s.topRow}>
          <View></View>

          <Text style={[s.title, {marginLeft: 35}]}>{entry.item_name}</Text>

          <View style={{flexDirection: 'row'}}>
            <SimpleBtn callback={this.setCount.bind(this)} buttonText="Add" />
          </View>
        </View>

        {binaryRender(entry.properties, (
          <View style={s.infoRow}>
            <Text style={s.label}>Properties</Text>
            <Text style={[s.element, s.body]}>{entry.properties}</Text>
          </View>
        ), null)}

        {binaryRender(entry.rangeLo, (
          <View style={s.infoRow}>
            <Text style={s.label}>Range</Text>
            <Text style={[s.element, s.body]}>{entry.rangeLo}/{entry.rangeHi} ft.</Text>
          </View>
        ), null)}

        {binaryRender(entry.dice_count, (
          <View style={s.infoRow}>
            <Text style={s.label}>Attacks</Text>
            <Text style={[s.element, s.body]}>
              {entry.dice_count}d{entry.dice_type}
              {entry.versatility ? " or "+entry.dice_count+"d"+entry.versatility : ""}
              {entry.damageType ? " "+entry.damageType+" " : " "}
              damage.
            </Text>
          </View>
        ), null)}

        {binaryRender(entry.value, (
          <View style={s.infoRow}>
            <Text style={s.label}>Description</Text>
            {binaryRender(entry.description,(
              <Text style={s.element}>{entry.description}</Text>
              ), null)}
            <Text style={[s.element, s.body]}>Weight: {entry.weight}lbs, Value: {entry.value}</Text>
          </View>
        ), null)}

        <Modal isVisible={this.state.showItemCount}>
          <View style={s.container}>
            <SetCount
              topText="Add how many?"
              entry={entry}
              minimum={1}
              addEntry={this.props.addItem}
              closeModal={this.closeModal.bind(this)}
            />
          </View>
        </Modal>

      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetails);

const s = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 300,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addBtn: {
    alignItems: 'center'
  },
  body: {
    textAlign: 'center',
  },
  topRow: {
    width: '95%',
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoRow: {
    width: '95%',
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'column',
  },
  element: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
});