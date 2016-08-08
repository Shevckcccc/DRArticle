'use strict';

import React, {Component} from 'react';
import {View,Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import AppColors from '../common/AppColors';
import DRImage from './DRImage';

export default class FollowingCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
    };
  }
  render() {
    return (
	     <TouchableHighlight 
       style={styles.row}
	     	onPress={() => this.props.onSelect(this.state.article)}
	     	underlayColor={AppColors.highlight}>
	        <View>
	          <DRImage
	            source={{uri: this.state.article.titleImage}}
	            style={styles.thumbnail}
	          />
	          <Text style={styles.author}>{this._getAuthor()}</Text>
	        </View>
	      </TouchableHighlight>
    );
  }

  _getAuthor() {
  	return '点融网';
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
  },

  thumbnail: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  author: {
    fontSize: 12,
    color: 'rgb(0, 0, 0)',
    marginTop: 10,
    textAlign: 'center'
  },

});