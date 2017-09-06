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
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
import Modal from 'react-native-modal';
import axios from 'axios'; //axios for AJAX calls
//import api configurations
import { path, api } from '../_config.js';
//import custom components
import ItemEntry from './ItemEntry.js';
import InventoryDetails from './InventoryDetails.js';
import SetCount from './SetCount.js';

class CharInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={s.container}>
        <ScrollView>
          <Text style={s.title}>Character Inventory</Text>
          {this.props.items.map((entry, i) => {
            return (
              <ItemEntry key={i} index={i}
                charId={this.props.character.id}
                setSelection={this.props.setSelection}
                updateCount={this.props.updateCount}
                entry={entry}
              />
            )
          })}
        </ScrollView>

        <Modal isVisible={this.props.showItemDetails}>
          <View>
            <InventoryDetails
              closeModal={this.props.closeModal}
              selection={this.props.items[this.props.selection]}
            />
          </View>
        </Modal>

        <Modal isVisible={this.props.showItemCount}>
          <View>
            <SetCount
              itemId={this.props.items[this.props.selection]}
              count={this.props.items[this.props.selection]}
              updateCount={this.props.updateCount}
              removeEntry={this.props.removeEntry}
              getInventory={this.props.getInventory}
              closeModal={this.props.closeModal}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

export default CharInventory;

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