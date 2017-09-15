//Reducer for page routing. Here you will find the state names and functions
//associated with manipulating the state through its life cycle.
import { createReducer } from '../_utility/reduxHelpers.js';
import * as types from '../_actions/types.js';

//Page state and function for setting it
export const page = createReducer(null, {
  [types.SET_PAGE](state, action) {
    return action.page;
  }
});