/*Helper Functions for use components*/
module.exports = { //returns one or the other component based on a condition check
  binaryRender: (condition, main, other) => { //takes a condition as the 1st parameter and two components as the 2nd and 3rd.
    return condition ? main : other;
  }
};