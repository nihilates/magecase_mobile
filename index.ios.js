import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './App.js'; //main container component
/*Redux Hookup*/
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './src/_reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});

export default class Magecase extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Magecase', () => Magecase);