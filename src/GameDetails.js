import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class GameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  backHome() {
    Actions.Home({view: false});
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>Game Details</Text>
        <Text>{JSON.stringify(this.props.subject)}</Text>
        <TouchableOpacity onPress={this.backHome.bind(this)}>
            <Text style={s.textBtn}> Back </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default GameDetails;

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