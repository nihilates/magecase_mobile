//Display component of characters belonging to a logged in user
import React, { Component } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
/* Import API Config */
import axios from 'axios'; //axios for AJAX calls
import { path, api } from '../_config.js';
/* Import Custom Components */
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
import ItemEntry from './ItemEntry.js';
import InventoryDetails from './InventoryDetails.js';
import SetCount from './SetCount.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    selectedChar: state.selectedChar,
    items: state.items,
  }
};

/* Body of Component */
class CharInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('CHAR INVENTORY PROPS:',this.props)

    return (
      <View style={s.container}>
        <ScrollView>
          <Text style={s.title}>Character Inventory</Text>
          {(this.props.selectedChar.inventories ? this.props.selectedChar.inventories : []).map((entry, i) => {
            return (
              <ItemEntry key={i} index={i}
                setSelection={this.props.setSelection}
                entry={entry}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharInventory);

const s = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'hsla(180, 80%, 100%, 0.5)',
    width: '90%',
    height: 300,
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
});