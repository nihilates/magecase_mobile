/* Helper Functions For Complex Redux Behaviors */
import axios from 'axios'; //axios for AJAX calls
import { path, api } from '../_config.js';

const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
};

const splitData = (data, callback) => {
  //TODO: Function to split data can apply a callback on each piece
}

const joinData = (data, callback) => {
  //TODO: Function to join a collection of objects into a single object for storage purposes
}

module.exports = {
  createReducer,
};