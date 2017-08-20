/*Helper Functions for use components*/
import { AsyncStorage } from 'react-native'; //required for AsyncStorage token saving functions

module.exports = { //returns one or the other component based on a condition check
  binaryRender: (condition, main, other) => { //takes a condition as the 1st parameter and two components as the 2nd and 3rd.
    return condition ? main : other; //if the input condition is true, render the main component. Otherwise, render the other component.
  },
  //Methods for testing account signup input validity
  chkUName: username => { //takes a submitted username string
    //declare a regex to check that a username contains only letters and/or numbers
    const regex = /^[a-z\-0-9]+$/i;
    //check length then regex, in that order. Return object with bool and error message for dynamic Alerts in the app
    if (username.length<6) { //if the username is less than 6 characters long...
      return {invalid: true, message: 'Usernames must be at least 6 characters long'}; //username is invalid
    } else if (!regex.test(username)) { //if the username contains invalid characters...
      return {invalid: true, message: 'Usernames can only contains letters and/or numbers'}; //username is invalid
    } else { //otherwise, the username is NOT invalid
      return {invalid: false};
    }
  },

  chkEmail: email => { //takes a submitted email string
    //declare a regular expression to test email syntax
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email) ) { //if the submitted email is not in the format of a typical email...
      return {invalid: true, message: 'Please enter a valid email address'}; //email is invalid
    } else { //otherwise...
      return {invalid: false}; //the email is NOT invalid
    };
  },

  chkPwd: (password, pwdAgain) => { //takes a submitted password and confirmed password, both as strings
    //declare a regex to check for invalid characters in a password
    const regex = /[<\>\[\]\{\}\(\)\|]/g;
    //check the validity of the "password", its length, and then if it matches the "pwdAgain"
    if (regex.test(password)) { //if the password contains invalid characters...
      return {invalid: true, message: 'Passwords cannot contain the following characters: <>[]{}()|'} //password is invalid
    } else if (password.length<8) { //if the password is less than 8 characters in length...
      return {invalid: true, message: 'Passwords must be at least 8 characters long.'} //password is invalid
    } else if (password !== pwdAgain) { //if the password and the pwdAgain do not match...
      return {invalid: true, message: 'The passwords need to match.'} //password is invalid
    } else { //otherwise...
      return {invalid: false} //the password is NOT invalid
    }
  },
  //save token data to the device
  saveToken: async (name, data) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
      console.error('AsyncStorage error:', error.message);
    }
  },

  getToken: async (callback) => {
    //get the token, if one exists
    await AsyncStorage.getItem('session').then(session => {
      let data = JSON.parse(session);
      let idToken = data !== null ? data.auth.id_token : null;
      let user = data !== null ? data.userData : null;

      callback({ token: idToken, userData: user, isLoaded: true });
    });
  }
};