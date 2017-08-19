import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class CharDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  backHome() {
    Actions.Home();
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>Character Details</Text>
        <Text>{JSON.stringify(this.props.character)}</Text>
        <TouchableOpacity onPress={this.backHome.bind(this)}>
          <Text style={s.textBtn}> Back </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default CharDetails;

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