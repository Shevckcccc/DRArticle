'use strict';

import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';


import TabNav from './pages/TabNav';
import BaseStyles from './assets/style/Base';

export default class App extends Component {

  render() {
    let store = createStore(reducer);
    console.log(store.getState())
    
    return(
      <Provider store={store}>
      	<View style={BaseStyles.container}>
  	        <StatusBar
  	          translucent={true}
  	          backgroundColor="rgba(0, 0, 0, 0.2)"
  	          barStyle="light-content"
  	         />
        	<TabNav />
        </View>
      </Provider>
    );
  }
  
}
