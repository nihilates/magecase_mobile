/*Helper Functions for use components*/
module.exports = { //returns one or the other component based on a condition check
  binaryRender: (condition, main, other) => { //takes a condition as the 1st parameter and two components as the 2nd and 3rd.
    return condition ? main : other;
  },
  //Methods for testing account signup input validity
  chkUName: (username) => {
    //declare a regex to check that a username contains only letters and/or numbers
    const regex = /^[a-z\-0-9]+$/i;
    //check length then regex, in that order. Return object with bool and error message for dynamic Alerts in the app
    if (username.length<6) {
      return {invalid: true, message: 'Usernames must be at least 6 characters long'};
    } else if (!regex.test(username)) { //if the username contains invalid characters...
      return {invalid: true, message: 'Usernames can only contains letters and/or numbers'};
    } else {
      return {invalid: false};
    }
  },

  chkEmail: (email) => {
    //declare a regular expression to test email syntax
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email) ) {
      return {invalid: true, message: 'Please enter a valid email address'};
    } else {
      return {invalid: false};
    };
  },

  chkPwd: (password, pwdAgain) => {
    //declare a regex to check for invalid characters in a password
    const regex = /[<\>\[\]\{\}\(\)\|]/g;
    //check the validity of the "password", its length, and then if it matches the "pwdAgain"
    if (regex.test(password)) {
      return {invalid: true, message: 'Passwords cannot contain the following characters: <>[]{}()|'}
    } else if (password.length<8) {
      return {invalid: true, message: 'Passwords must be at least 8 characters long.'}
    } else if (password !== pwdAgain) {
      return {invalid: true, message: 'The passwords need to match.'}
    } else {
      return {invalid: false}
    }
  }
};