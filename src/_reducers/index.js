import { combineReducers } from 'redux';
import * as accountsReducer from './accountsReducer.js';
import * as selectionReducer from './selectionReducer.js';

export default combineReducers(Object.assign({},
  accountsReducer,
  selectionReducer,
));