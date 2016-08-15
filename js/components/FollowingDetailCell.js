'use strict';

import React, {Component} from 'react';
import {View,Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';
import AppColors from '../common/AppColors';
import DRImage from './DRImage';

export default class FollowingDetailCell extends Component {
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
	        <View style={styles.row}>
	          <DRImage
	            source={{uri: this.state.article.titleImage}}
	            style={styles.thumbnail}
	          />
	          <View style={styles.content}>
	            <Text style={styles.title}>{this.state.article.title}</Text>
              <View style={styles.info}>
                <Text style={styles.author}>{this._getAuthor()}</Text>
              <Text style={styles.time}>{this._getTime()}</Text>
              </View>
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

var styles = StyleSheet.create({
  row: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    padding: 10,
  },

  thumbnail: {
    height: 150,
    width: Dimensions.get('window').width - 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'red',
  },

  content: {
    paddingLeft: 0,
    marginTop: 10,
    flexDirection: 'column',
  },

  title: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'left',
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  author: {
    fontSize: 12,
    color: '#999999',
  },

  time: {
    marginLeft: 10,
    fontSize: 12,
    color: '#999999',
  },

});