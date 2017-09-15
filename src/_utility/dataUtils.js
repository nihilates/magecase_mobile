/* Function to Assist Sorting Data on Client Side */

module.exports = {

  //Enter and array and get multiple correct answers
  displayOnly(array, key, value) { //Take an array of objects, a desired key to check, and a value it should be equal to
    return array.filter(index => index[key] === value);
  },

  //Enter an array and get the first correct answer
  displayMatch(array, key, value) { //Take an array of objects, a desired key to check, and a value it should be equal to
    return array.filter(index => index[key] === value)[0]; //Returns only the first index, which should be the single correct item
  },

};