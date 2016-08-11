'use strict';

import React, {Component} from 'react';
import {View,Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import AppColors from '../common/AppColors';
import DRImage from './DRImage';

export default class ArticleCell extends Component {

  render() {
    return (
	     <TouchableHighlight
        style={this.props.style}
	     	onPress={() => this.props.onSelect(this.props.author)}
	     	underlayColor={AppColors.highlight}>
	        <View style={styles.row}>
	          <DRImage
	            source={{uri: this.props.author.titleImage}}
	            style={styles.thumbnail}
	          />
	          <View style={styles.rightContainer}>
              <Text style={styles.author}>{this._getAuthor()}</Text>
	            <Text style={styles.desc}>
                点融网致力打造高效透明的网络借贷平台。白领理财利器团团赚安全、灵活、收益好；贷款产品费用低、审批快。手机理财上点融
              </Text>
	          </View>
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
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    paddingBottom: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 18,
  },

  thumbnail: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },

  rightContainer: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'column',
  },

  author: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'left',
  },

  desc: {
    fontSize: 12,
    color: '#999999',
  },

});
