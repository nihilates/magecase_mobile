/* Component to Display a Selected Character's Details */
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
import Modal from 'react-native-modal';
/* Helper Functions */
import { displayMatch } from './_utility/dataUtils.js';
/* Import API Config */
import axios from 'axios'; //axios for AJAX calls
import { path, api } from './_config.js';
//Import Custom Components
import { SimpleBtn } from './components_misc/BasicCmpnts.js';
import MainNav from './MainNav.js';
import AddItem from './components_char/AddItem.js';
import CharInventory from './components_char/CharInventory.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    account: state.account,
    selectedChar: state.selectedChar,
    selectedEntry: state.selectedEntry,
    games: state.games,
    items: state.items,
  }
};

/* Component Body */
class CharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showItemDetails: false,
      showItemCount: false,
      showAddItem: false,
      items: [],
      selection: null
    };
  }

  setSelection(entry, modal) {
    if (modal==='details') {
      this.props.selectEntry(entry);
      this.setState({ showItemDetails: true })
    } else if (modal==='count') {
      this.props.selectEntry(entry);
      this.setState({ showItemCount: true })
    }
  }

  showAddItem() {
    this.setState({showAddItem: true})
  }

  closeModal() {
    this.setState({showItemDetails: false, showItemCount: false, showAddItem: false});
  }

  updateCount(itemId, count) {
    axios.put(path+api.inventory.update, {
      charId: this.props.subject.id,
      id: itemId,
      count: count
    })
    .then(data => console.log(data))
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

  addItem(item, count=1) {
    axios.post(path+api.inventory.add, {
      charId: this.props.subject.id,
      itemId: item,
      count: count
    })
    .then(() => this.getInventory())
    .catch(error => console.error(error));
  }

  backHome() {
    const { goBack, setParams } = this.props.navigation;
    setParams({ origin: 'CharDetails' });
    goBack();
  }

  componentDidMount() {
    if (this.props.selectedChar) {
      this.setState({ isLoaded: true });
    }
  }

  render() {
    console.log('CHARDETAILS HAS RENDERED')
    console.log('CHAR_DETAILS PROPS:', this.props)
    const { goBack, navigate } = this.props.navigation;

    if (!this.state.isLoaded) {
      return <ActivityIndicator style={{'flex': 1}} />
    } else {
      return (
        <View style={s.container}>
          <MainNav
            nav={navigate}
            stack={this.props.navigation.dispatch}
            controls={[
              {callback: this.backHome.bind(this), text: 'Back'},
              {callback: this.showAddItem.bind(this), text: 'Add'}
            ]}
          />

          <Text style={s.title}>{this.props.selectedChar.char_name}</Text>

          <CharInventory
            character={this.props.selectedChar}
            showItemDetails={this.state.showItemDetails}
            showItemCount={this.state.showItemCount}
            closeModal={this.closeModal.bind(this)}
            updateCount={this.updateCount.bind(this)}
            removeEntry={this.removeEntry.bind(this)}
            items={this.props.selectedChar.inventories}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(CharDetails);


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