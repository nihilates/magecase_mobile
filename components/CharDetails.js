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
import CharInventory from './components_char/CharInventory.js';
import ItemDetails from './components_char/ItemDetails.js';
import ItemCount from './components_char/ItemCount.js';

class CharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      showItemDetails: false,
      showItemCount: false,
      items: [],
      assets: [],
      bank: [],
      wallet: [],
      selection: null, //the index of a items/assets/banks/wallet to send to the modal's display
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

  backHome() {
    Actions.Home({view: true});
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

  setSelection(index, modal) {
    if (modal==='details') {
      this.setState({showItemDetails: true, selection: index});
    } else if (modal==='count') {
      this.setState({showItemCount: true, selection: index})
    }
  }

  closeModal() {
    this.setState({showItemDetails: false, showItemCount: false});
  }

  componentDidMount() {
    this.getInventory();
  }

  render() {
    return (
      <View style={s.container}>
        <MainNav controls={[{callback: this.backHome.bind(this), text: 'Back'}]} />
        <Text style={s.title}>{this.props.subject.char_name}</Text>
        <CharInventory
          character={this.props.subject}
          items={this.state.items}
          setSelection={this.setSelection.bind(this)}
        />

        <Modal isVisible={this.state.showItemDetails}>
          <View>
            <ItemDetails
              closeModal={this.closeModal.bind(this)}
              selection={this.state.items[this.state.selection]}
            />
          </View>
        </Modal>

        <Modal isVisible={this.state.showItemCount}>
          <View>
            <ItemCount
              closeModal={this.closeModal.bind(this)}
              selection={this.state.items[this.state.selection]}
              updateCount={this.updateCount.bind(this)}
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