import React, { Component } from 'react';
import { View, Text, ListView, Image, TouchableHighlight, RecyclerViewBackedScrollView, StyleSheet } from 'react-native';
import BaseStyles from '../../assets/style/Base';
import Loading from '../../components/Loading';

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentWillMount() {
    this._fetchData();
  }

  _fetchData() {
  }

  render() {
    if(!this.state.loaded) {
      return (
        <Loading/>
      );
    }
    return (
      <Text >
          ABCDET
      </Text>
    );
  }
}