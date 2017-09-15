//Reducer for selected characters/games/items. Here you will find the state names and functions
//associated with manipulating the state through its life cycle.
import { createReducer } from '../_utility/reduxHelpers.js';
import * as types from '../_actions/types.js';

//Selected Character state and function for setting it
export const selectedChar = createReducer({}, {
  [types.SET_SELECTEDCHAR](state, action) {
    return action.character;
  }
});

//Selected Game state and function for setting it
export const selectedGame = createReducer({}, {
  [types.SET_SELECTEDGAME](state, action) {
    return action.game;
  }
});

//Selected Inventory Entry state and function for setting it
export const selectedEntry = createReducer({}, {
  [types.SET_SELECTEDENTRY](state, action) {
    return action.entry;
  }
});