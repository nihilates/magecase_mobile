import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'; //axios for AJAX calls
import Modal from 'react-native-modal';
//Import api configuration
import { path, api } from './_config.js';
//Import Custom Components
import MainNav from './MainNav.js';
import AddItem from './components_char/AddItem.js';
import CharInventory from './components_char/CharInventory.js';

class CharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showItemDetails: false,
      showItemCount: false,
      showAddItem: false,
      items: [],
      selection: null
    };
  }

  getInventory() { //populates the component with inventory data
    axios.get(path+api.inventory.all, {
      params: {
        charId: this.props.subject.id
      }
    })
      .then(res => {
        let data = res.data;
        this.setState({items: data});
      })
      .catch(error => console.error(error));
  }

  setSelection(index, modal) {
    if (modal==='details') {
      this.setState({showItemDetails: true, selection: index});
    } else if (modal==='count') {
      this.setState({showItemCount: true, selection: index})
    }
  }

  showAddItem() {
    this.setState({showAddItem: true})
  }

  closeModal() {
    this.setState({showItemDetails: false, showItemCount: false, showAddItem: false});
  }

  updateCount(item) {
    axios.put(path+api.inventory.update, {
      charId: this.props.subject.id,
      id: item.id,
      count: item.count
    })
    .then(() => this.getInventory())
    .catch(error => console.error(error));
  }

  removeEntry(inv_id) {
    axios.delete(path+api.inventory.remove, {
      data: {
        charId: this.props.subject.id,
        id: inv_id
      }
    })
    .then(() => this.getInventory())
    .catch(error => console.error(error));
  }

  addItem(item, count) {
    axios.post(path+api.inventory.remove, {
      charId: this.props.subject.id,
      itemId: item,
      count: count
    })
    .then(() => this.getInventory())
    // .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  backHome() {
    Actions.Home({view: true});
  }

  componentDidMount() {
    this.getInventory();
  }

  render() {
    return (
      <View style={s.container}>
        <MainNav
          controls={[
            {callback: this.backHome.bind(this), text: 'Back'},
            {callback: this.showAddItem.bind(this), text: 'Add'}
          ]}
        />

        <Text style={s.title}>{this.props.subject.char_name}</Text>

        <CharInventory
          character={this.props.subject}
          showItemDetails={this.state.showItemDetails}
          showItemCount={this.state.showItemCount}
          closeModal={this.closeModal.bind(this)}
          updateCount={this.updateCount.bind(this)}
          removeEntry={this.removeEntry.bind(this)}
          items={this.state.items}
          setSelection={this.setSelection.bind(this)}
          selection={this.state.selection}
        />

        <Modal isVisible={this.state.showAddItem}>
          <View>
            <AddItem
              addItem={this.addItem.bind(this)}
              closeModal={this.closeModal.bind(this)}
            />
          </View>
        </Modal>

      </View>
    )
  }
}

export default CharDetails;


const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
  input: {
    height: 50,
    width: 190,
  },
  textBtn: {
    fontWeight: 'bold',
    marginBottom: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});