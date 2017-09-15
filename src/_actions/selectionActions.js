import * as types from './types.js';

/* Selected Based States */
export function selectCharacter(character) { //Character
  return {
    type: types.SET_SELECTEDCHAR,
    character,
  };
};

export function selectGame(game) { //Game
  return {
    type: types.SET_SELECTEDGAME,
    game,
  };
};

export function selectEntry(entry) { //Inventory Entry
  return {
    type: types.SET_SELECTEDENTRY,
    entry,
  };
};