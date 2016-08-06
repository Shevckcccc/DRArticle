'use strict';

import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <ActivityIndicator color="#000" style={{flex:1, marginVertical: 30,marginBottom: 30}} />
    );
  }
}