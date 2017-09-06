/*Helper Functions for use components*/
import { AsyncStorage, Alert } from 'react-native'; //required for AsyncStorage token saving functions

module.exports = {
  //helper to create reducer functions
  createReducer: (initialState, handlers) => {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
      } else {
        return state
      }
    }
  },

  //returns one or the other component based on a condition check
  binaryRender: (condition, main, other) => { //takes a condition as the 1st parameter and two components as the 2nd and 3rd.
    return condition ? main : other; //if the input condition is true, render the main component. Otherwise, render the other component.
  },

  //Method to verify that text input fields have all be filled with correct formatting
  chkForm: form => {
    //check that all fields have been filled
    for (key in form) {
      if (form[key].length===null || form[key].length<1) {
        Alert.alert('Please fill out all fields');
        return false;
      }
    };

    if (form.username && !chkUName(form.username)) return false; //if the username meets all requirements...
    if (form.email && !chkEmail(form.email)) return false; //if the email address is valid...
    if (form.password && !chkPwd(form.password, form.pwdConfirm)) return false; //if the passwords match and are valid...
    return true; //if all pass, return true
  },

  //save token data to the device
  saveToken: async (name, data, callback) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
      console.error('AsyncStorage error:', error.message);
    }
  },

  getToken: async callback => {
    //get the token, if one exists
    await AsyncStorage.getItem('session').then(session => {
      let data = JSON.parse(session);
      let idToken = data !== null ? data.auth.id_token : null;
      let user = data !== null ? data.userData : null;

      // callback({ token: idToken, userData: user, isLoaded: true });
      callback({ token: idToken, userData: user });
    });
  },

  getData: async (name, callback) => {
    await AsyncStorage.getItem(name).then(account => {
      let data = JSON.parse(account);
      // callback({ account: data[0], isLoaded: true });
      callback(data[0]);
    });
  },
};

//Internal Helper Functions
const chkUName = username => { //takes a submitted username string
  let regex = /^[a-z\-0-9]+$/i;
  if (username.length<6) {
    Alert.alert('Usernames must be 6 or more characters');
    return false;
  }
  if (!regex.test(username)) {
    Alert.alert('Username contains invalid characters');
    return false;
  }
  return true;
};

const chkEmail = email => { //takes a submitted email string
  //declare a regular expression to test email syntax
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(email) ) { //if the submitted email is not in the format of a typical email...
    Alert.alert('Please enter a valid email address');
    return false;
  };
  return true;
};

const chkPwd = (password, pwdAgain) => { //takes a submitted password and confirmed password, both as strings
  //declare a regex to check for invalid characters in a password
  let regex = /[<\>\[\]\{\}\(\)\|]/g;
  //check the validity of the "password", its length, and then if it matches the "pwdAgain"
  if (regex.test(password)) { //if the password contains invalid characters...
    Alert.alert('Password contains invalid characters')
    return false;
  };
  if (password.length<8) { //if the password is less than 8 characters in length...
    Alert.alert('Passwords must be 8 or more characters')
    return false;
  };
  if (password !== pwdAgain) { //if the password and the pwdAgain do not match...
    Alert.alert('The passwords don\'t match')
    return false; //password is invalid
  };
  return true;
};