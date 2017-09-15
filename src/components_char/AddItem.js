/* Component Modal For Adding Items to Character Inventory */
import React, { Component } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
/* Helper Functions */
import { displayOnly } from '../_utility/dataUtils.js';
import { chkForm } from '../_utility/formUtils.js';
/* Import API Config */
import axios from 'axios'; //axios for AJAX calls
import { path, api } from '../_config.js';
/* Import Custom Components */
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
import DropdownMenu from '.././components_misc/DropdownMenu.js';
import ItemDetails from './ItemDetails.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    itemTypes: state.itemTypes,
    items: state.items,
  }
};

/* Body of Component */
class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: this.props.itemTypes[0],
      selectedSub: this.props.itemTypes[0].item_subtypes[0],
    };
  }

  render() {
    return (
      <View style={s.container}>
        <View style={s.topRow}>
        </View>

        <View style={s.menuRow}>
          <Text>Type: </Text>
          <DropdownMenu
            defaultIndex={0}
            options={this.props.itemTypes.map(type => {
              return type.type_name;
            })}
            onSelect={index => {
              this.setState({ selectedType: this.props.itemTypes[index], selectedSub: this.props.itemTypes[index].item_subtypes[0] });
            }}>
            <Text>{this.state.selectedType ? this.state.selectedType.type_name : "Select Item Type"}</Text>
          </DropdownMenu>
        </View>

        <View style={s.menuRow}>
          <Text>Category: </Text>
          <DropdownMenu
            defaultIndex={0}
            options={this.state.selectedType.item_subtypes.map(sub => {
              return sub.sub_name;
            })}
            onSelect={index => {
              this.setState({ selectedSub: this.state.selectedType.item_subtypes[index] });
            }}>
            <Text>{this.state.selectedSub ? this.state.selectedSub.sub_name : "Select Category"}</Text>
          </DropdownMenu>
        </View>

        <View style={s.viewRow}>
          <ScrollView horizontal={true}>
            <View style={s.item}>
              {displayOnly(this.props.items, 'itemSubTypeId', this.state.selectedSub.id).map((item, i) => {
                return <ItemDetails key={i} selection={item} addItem={this.props.addItem} />
              })}
            </View>
          </ScrollView>
        </View>

        <View>
          <SimpleBtn callback={this.props.closeModal} buttonText="Cancel"/>
        </View>

      </View>
    )
  }
}

/* Wrap With Redux And Export */
export default connect(mapStateToProps, mapDispatchToProps)(AddItem);

const s = StyleSheet.create({
  container: {
    backgroundColor: 'hsl(180, 80%, 100%)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  viewRow: {
    backgroundColor: 'hsl(0, 0%, 80%)',
  },
  item: {
    flexDirection: 'row',
  },
});