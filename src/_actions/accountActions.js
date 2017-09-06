import * as types from './types.js';

export function setAccount({ account }) {
  return {
    type: types.SET_ACCOUNT,
    account,
  }
}