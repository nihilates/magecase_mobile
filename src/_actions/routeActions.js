import * as types from './types.js';

/* Selected Based States */
export function setPage(page) { //Character
  return {
    type: types.SET_PAGE,
    page,
  };
};
