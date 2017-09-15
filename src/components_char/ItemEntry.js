/* Component to Display A Single Item Entry */
import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
/* Helper Functions */
import { displayMatch } from '../_utility/dataUtils.js';
/* Import Custom Components */
import { SimpleBtn } from '../components_misc/BasicCmpnts.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    items: state.items,
  }
};

class ItemEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: displayMatch(this.props.items, 'id', this.props.entry.itemId),
    };
  }

  render() {
    console.log('ItemEntry says:', this.state.entry)
    console.log('Could be...', displayMatch(this.props.items, 'id', this.props.entry.itemId))
    return (
      <View style={s.container}>
        <SimpleBtn
          callback={() => this.props.setSelection(this.props.entry, 'details')}
          buttonText={this.props.entry.item.item_name}
        />
        <SimpleBtn
          callback={() => this.props.setSelection(this.props.entry, 'count')}
          buttonText={"x"+this.props.entry.count}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEntry);

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});