/* Function to Assist Sorting Data on Client Side */

module.exports = {

  displayOnly(array, key, value) { //Take an array of objects, a desired key to check, and a value it should be equal to
    return array.filter(index => index[key] === value);
  },

};