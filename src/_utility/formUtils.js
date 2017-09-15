/* Helper Functions For Use With Forms */

module.exports = {
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
};

/* Internal Helper Functions */
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