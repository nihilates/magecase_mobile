/* Component to Display Login/Signup Options */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
/* Helper Functions */
import { binaryRender } from './_utility/generalUtils.js'; //binaryRender helper function allows boolean rendering of 2 different components
/* Import Custom Components */
import { SimpleBtn } from './components_misc/BasicCmpnts.js';
import Login from './components_auth/Login.js';
import Signup from './components_auth/Signup.js';
/* Redux Hookup */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './_actions';

/* Setting Component's Props from Redux Store */
const mapDispatchToProps = dispatch => {return bindActionCreators(ActionCreators, dispatch) };
const mapStateToProps = state => {
  return {
    token: state.token,
    account: state.account,
    page: state.page,
  }
};

/* Component Body */
class Auth extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasAccount: true, //if hasAccount is "true", shows login page. Otherwise, it shows signup page
      loggedOut: !this.props.account,
    };
  }

  accessMethod() { //Method to pass into the props of the "Create Account"/"Login Account" button to allow toggle
    this.setState({ hasAccount: !this.state.hasAccount });
  }

  render() {
    console.log('AUTH HAS RENDERED')
    const { navigate } = this.props.navigation;
    return (
      <View style={s.container}>
        {binaryRender(this.state.hasAccount, <Login nav={navigate} />, <Signup nav={navigate} />)}
        <SimpleBtn
          callback={this.accessMethod.bind(this)}
          buttonText={this.state.hasAccount ? 'Create Account' : 'Login Account'} //Button text depends on hasAccount state
        />
      </View>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsl(215, 80%, 95%)',
  },
});