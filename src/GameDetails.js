import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {return {
  selectedGame: state.selectedGame
}};

/* Component Body */
class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  backHome() {
    const { goBack } = this.props.navigation
    goBack();
    // Actions.Home({view: false});
  }

  render() {
    console.log('GAMEDETAILS RENDERED')
    console.log('GAME_DETAILS PROPS:', this.props)
    return (
      <View style={s.container}>
        <Text style={s.title}>Game Details</Text>
        <Text>{JSON.stringify(this.props.selectedGame)}</Text>
        <TouchableOpacity onPress={this.backHome.bind(this)}>
            <Text style={s.textBtn}> Back </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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