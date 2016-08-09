'use strict';

import React, {Component} from 'react';
import {View,Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import AppColors from '../common/AppColors';
import DRImage from './DRImage';

export default class AuthorHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
       <TouchableHighlight 
        onPress={() => this.props.onSelect(this.props.author)}
        underlayColor={AppColors.highlight}>
          <View style={styles.header}>
            <View style={styles.row}>
              <DRImage
                source={{uri: this.props.author.titleImage}}
                style={styles.thumbnail}
              />
              <Text style={styles.author}>{this._getAuthor()}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.desc}>点融网致力打造高效透明的网络借贷平台。白领理财利器团团赚安全、灵活、收益好；贷款产品费用低、审批快。手机理财上点融</Text>
                <View style={styles.followers}>
                    <Text style={styles.count}>4765人关注</Text>
                </View>
            </View>
          </View>
        </TouchableHighlight>
    );
  }

  _getTime() {
    //TODO:
    return '2016-08-17';
  }

  _getAuthor() {
    return '点融网';
  }
}

var styles = StyleSheet.create({
  header: {
    flex:1,
    flexDirection: 'column',
    padding: 10,
  },

  row: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },

  thumbnail: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginLeft: 10,
    marginRight: 10,
  },

  author: {
    fontSize: 16,
    color: 'black',
    fontWeight: "900",
  },

  info: {
    margin:10,
  },

  desc: {
    fontSize: 12,
    color: '#999999',
  },

  followers: {
    marginTop:8,
  },

  count: {
    color: '#666666',
    fontSize:12,
  }



});