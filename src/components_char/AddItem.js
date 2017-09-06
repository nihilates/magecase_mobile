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
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
import DropdownMenu from '.././components_misc/DropdownMenu.js';
import axios from 'axios'; //axios for AJAX calls
import { chkForm } from '../_util.js';
//import api configurations
import { path, api } from '../_config.js';
//import custom components
import ItemDetails from './ItemDetails.js';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemTypes: [],
      itemSubTypes: [],
      items: [],
      selectedType: null,
      selectedSub: null,
      selectedItem: null,
      selectedCount: null,
    };
  }

  getTypes(index=0) { //populates the component with item data
    axios.get(path+api.item.types)
      .then(res => {
        let data = res.data;
        //sets the returned data to state, and sets the default selected type as the first index
        this.setState({itemTypes: data, selectedType: data[index]});
      })
      .then(() => {
        this.getSubs();
      })
      .catch(error => console.error(error));
  }

  getSubs(index=0) {
    axios.get(path+api.item.subtypes, {
      params: {
        typeId: this.state.selectedType.id
      }
    })
      .then(res => {
        let data = res.data;
        this.setState({itemSubTypes: data, selectedSub: data[index]});
      })
      .then(() => {
        this.getItems();
      })
      .catch(error => console.error(error));
  }

  getItems(index=0) {
    axios.get(path+api.item.oftype, {
      params: {
        typeId: this.state.selectedType.id,
        subTypeId: this.state.selectedSub.id
      }
    })
      .then(res => {
        let data = res.data;
        this.setState({items: data, selectedItem: data[index]});
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getTypes();
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
            options={this.state.itemTypes.map(type => {
              return type.type_name;
            })}
            onSelect={index => {
              this.getTypes(index);
            }}>
            <Text>{this.state.selectedType ? this.state.selectedType.type_name : "Select Item Type"}</Text>
          </DropdownMenu>
        </View>

        <View style={s.menuRow}>
          <Text>Category: </Text>
          <DropdownMenu
            defaultIndex={0}
            options={this.state.itemSubTypes.map(sub => {
              return sub.sub_name;
            })}
            onSelect={index => {
              this.getSubs(index);
            }}>
            <Text>{this.state.selectedSub ? this.state.selectedSub.sub_name : "Select Category"}</Text>
          </DropdownMenu>
        </View>

        <View style={s.viewRow}>
          <ScrollView horizontal={true}>
            <View style={s.item}>
              {this.state.items.map((item, i) => {
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

export default AddItem;

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