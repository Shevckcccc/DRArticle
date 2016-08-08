'use strict';

import React, {Component} from 'react';
import {Image} from 'react-native';

export default class DRImage extends Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <Image 
        ref={component => this._root = component} 
      	defaultSource={require('../assets/image/DefaultImage.png')} 
      	{...this.props} />
    );
  }
}