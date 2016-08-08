'use strict';

import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default class BackBarButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../assets/image/ArrowBack.png')}
          style={[{ width: 50, height: 33, }, { marginLeft: 8, marginTop: 6}, this.props.style]}/>
      </TouchableOpacity>
    );
  }
}