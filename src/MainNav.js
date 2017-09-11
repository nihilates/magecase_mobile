/* Top Navigator For All Pages */
import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
/* Import Utility Functions */
import { removeFile } from './_utility/manageStorage.js';
/* Import Custom Components */
import { SimpleBtn } from './components_misc/BasicCmpnts.js';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  userLogout() {
  removeFile('accountData')
  removeFile('session', Actions.Auth)
  } //Method for deleting session and logging out

  render() {
    return (
      <View style={s.container}>
        <View style={s.controls}>
          {this.props.controls.map((control, i) => {
            return <SimpleBtn key={i} callback={control.callback} buttonText={control.text} />
          })}
        </View>

        <View>
          <SimpleBtn callback={this.userLogout.bind(this)} buttonText="Log Out"/>
        </View>
      </View>
    )
  }
}

export default MainNav;

const s = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'hsla(180, 80%, 100%, 0.5)',
    width: '90%',
    height: 60,
  },
  textBtn: {
    fontWeight: 'bold',
    padding: 10,
  },
  controls: {
    flexDirection: 'row'
  }
});