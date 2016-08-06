'use strict';

import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import TabNav from './pages/TabNav';
import BaseStyles from './assets/style/Base';

export default class App extends Component {

  render() {
    return(
    	<View style={BaseStyles.container}>
	        <StatusBar
	          translucent={true}
	          backgroundColor="rgba(0, 0, 0, 0.2)"
	          barStyle="light-content"
	         />
      	<TabNav />
      </View>
    );
  }
  
}
