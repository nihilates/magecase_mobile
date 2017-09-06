//Reducer for account information. Here you will find the state names and functions
//associated with manipulating the state through its life cycle.
import { createReducer } from '../_util.js';
import * as types from '../_actions/types.js';

//User account state and function for setting it
export const account = createReducer({}, {
  [types.SET_ACCOUNT](state, action) {
    return {name: 'biff meatwagon'};
  }
});