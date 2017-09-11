import * as types from './types.js';

export function setToken(token) {
  return {
    type: types.SET_TOKEN,
    token,
  };
};

export function setAccount(account) {
  return {
    type: types.SET_ACCOUNT,
    account,
  };
};

export function setAssets(assets) {
  return {
    type: types.SET_ASSETS,
    assets,
  };
};

export function setChars(chars) {
  return {
    type: types.SET_CHARS,
    chars,
  };
};

export function setCurrency(currency) {
  return {
    type: types.SET_CURRENCY,
    currency,
  };
};

export function setGames(games) {
  return {
    type: types.SET_GAMES,
    games,
  };
};

export function setItemTypes(itemTypes) {
  return {
    type: types.SET_ITEMTYPES,
    itemTypes,
  };
};

export function setItems(items) {
  return {
    type: types.SET_ITEMS,
    items,
  };
};

export function setShopTypes(shopTypes) {
  return {
    type: types.SET_SHOPTYPES,
    shopTypes,
  };
};

export function setShops(shops) {
  return {
    type: types.SET_SHOPS,
    shops,
  };
};