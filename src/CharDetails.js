/* Component to Display a Selected Character's Details */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
/* Import Custom Components */
import MainNav from './MainNav.js';
import AddItem from './components_char/AddItem.js';
import CharInventory from './components_char/CharInventory.js';
import InventoryDetails from './components_char/InventoryDetails.js';
import SetCount from './components_char/SetCount.js';
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
      showModal: false, //toggle for making modal container visible
      showItemDetails: false, //toggle for ItemDetails modal
      showItemCount: false, //toggle for ItemCount modal
      showAddItem: false, //toggle for AddItem modal
    };
  }

  setSelection(entry, modal) { //method to set the currectly selected entry and open a modal for it
    this.props.selectEntry(entry); //sets the Redux entry
    this.setState( Object.assign({}, { showModal: true }, modal) ); //toggles the modal container and the desired view
  }

  showAddItem() { //method to op the AddItem component modal
    this.setState({ showModal: true, showAddItem: true });
  }

  closeModal() { //method to close the container modal and resets all modal content
    this.setState({ showModal: false, showItemDetails: false, showItemCount: false, showAddItem: false });
  }

  backHome() { //navigation controls
    const { goBack } = this.props.navigation; //bind the "goBack' method from the navigation prop
    goBack(); //invoke to return to previous page
  }

  componentDidMount() {
    if (this.props.selectedChar) this.setState({ isLoaded: true }); //if a "selectedChar" exists, the the component is loaded
  }

  render() {
    console.log('CHARDETAILS HAS RENDERED')
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
            showItemDetails={this.state.showItemDetails}
            showItemCount={this.state.showItemCount}
            setSelection={this.setSelection.bind(this)}
            closeModal={this.closeModal.bind(this)}
          />

          <Modal isVisible={this.state.showModal}>
            <View>
              {(()=>{
                if (this.state.showAddItem) return <AddItem closeModal={this.closeModal.bind(this)} />
                if (this.state.showItemDetails) return <InventoryDetails closeModal={this.closeModal.bind(this)} />
                if (this.state.showItemCount) return <SetCount closeModal={this.closeModal.bind(this)} />
              })()}
            </View>
          </Modal>

        </View>
      )
    }
  }
};

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