//Reducer for account information. Here you will find the state names and functions
//associated with manipulating the state through its life cycle.
import { createReducer } from '../_utility/reduxHelpers.js';
import * as types from '../_actions/types.js';

//Token state and function for setting it
export const token = createReducer({}, {
  [types.SET_TOKEN](state, action) {
    return action.token;
  }
});

//User account state and function for setting it
export const account = createReducer({}, {
  [types.SET_ACCOUNT](state, action) {
    return action.account;
  }
});

//Asset Types state and function for setting it
export const assets = createReducer({}, {
  [types.SET_ASSETS](state, action) {
    return action.assets
  }
});

//Character state and function for setting it
export const characters = createReducer({}, {
  [types.SET_CHARS](state, action) {
    return action.chars
  }
});

//Currency System state and function for setting it
export const currencySystems = createReducer({}, {
  [types.SET_CURRENCY](state, action) {
    return action.currency
  }
});

//Games state and function for setting it
export const games = createReducer({}, {
  [types.SET_GAMES](state, action) {
    return action.games
  }
});

//Item Types state and function for setting it
export const itemTypes = createReducer({}, {
  [types.SET_ITEMTYPES](state, action) {
    return action.itemTypes
  }
});

//Items state and function for setting it
export const items = createReducer({}, {
  [types.SET_ITEMS](state, action) {
    return action.items
  }
});

//Shop Types state and function for setting it
export const shopTypes = createReducer({}, {
  [types.SET_SHOPTYPES](state, action) {
    return action.shopTypes
  }
});

//Shops state and function for setting it
export const shops = createReducer({}, {
  [types.SET_SHOPS](state, action) {
    return action.shops
  }
});