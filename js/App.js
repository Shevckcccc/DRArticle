'use strict';

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';

import AppNav from './pages/AppNav';
import BaseStyles from './assets/style/Base';

let reducer = combineReducers(reducers);
let store = createStore(reducer);

class App extends Component {

  render() {
    return(
      <Provider store={store}>
      	<View style={BaseStyles.container}>
  	        <StatusBar
  	          translucent={true}
  	          backgroundColor="rgba(0, 0, 0, 0.2)"
  	          barStyle="light-content"
  	         />
        	<AppNav />
        </View>
      </Provider>
    );
  }
}

module.exports = App;
