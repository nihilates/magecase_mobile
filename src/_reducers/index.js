import { combineReducers } from 'redux';
import * as routesReducer from './routesReducer.js';
import * as accountsReducer from './accountsReducer.js';
import * as selectionReducer from './selectionReducer.js';

export default combineReducers(Object.assign({},
  routesReducer,
  accountsReducer,
  selectionReducer,
));