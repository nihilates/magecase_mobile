import { combineReducers } from 'redux';
import * as accountsReducer from './accountsReducer.js';

export default combineReducers(Object.assign({},
  accountsReducer,
));