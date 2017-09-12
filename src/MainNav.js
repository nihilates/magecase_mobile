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
import { removeFile } from './_utility/storageUtils.js';
/* Import Custom Components */
import { SimpleBtn } from './components_misc/BasicCmpnts.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {return {}};

/* Component Body */
class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  userLogout() { //delete session token upon logout
    removeFile('session', Actions.Auth);
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);

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