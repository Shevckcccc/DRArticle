'use strict';

import React, {Component, PropTypes} from 'react';
import {View,Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import AppColors from '../common/AppColors';
import DRImage from './DRImage';

export default class ArticleCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
    };
  }
  render() {
    return (
	     <TouchableHighlight
	     	onPress={() => this.props.onSelect(this.state.article)}
	     	underlayColor={AppColors.highlight}>
	        <View style={[styles.row, this.props.cellContainerStyle]}>
	          <DRImage
	            source={{uri: this.state.article.titleImage}}
	            style={styles.thumbnail}
	          />
	          <View style={styles.rightContainer}>
	            <Text style={styles.title}>{this.state.article.title}</Text>
	            <Text style={styles.author}>{this._getAuthor()}</Text>
	            <Text style={styles.time}>{this._getTime()}</Text>
	          </View>
	        </View>
	      </TouchableHighlight>
    );
  }

  _getTime() {
  	//TODO:
  	this.state.article.publishedTime
  	return '2016-08-17';
  }

  _getAuthor() {
  	return '知乎';
  }
}

ArticleCell.propTypes = {
  cellContainerStyle: PropTypes.object,
  ...View.propTypes,
}

var styles = StyleSheet.create({
  row: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    padding: 10,
  },

  thumbnail: {
    height: 60,
    width: 80,
  },

  rightContainer: {
    paddingLeft: 10,
    height:60,
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    fontSize: 15,
    marginBottom: 3,
    textAlign: 'left',
  },

  author: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    fontSize: 12,
    color: '#999999',
  },

  time: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    fontSize: 12,
    color: '#999999',
  },

});
