import React, { Component } from 'react';
import { View, Text, ListView, Image, TouchableHighlight, StyleSheet, WebView } from 'react-native';
import NavigationBar from 'react-native-navbar';

import BaseStyles from '../../assets/style/Base';
import Loading from '../../components/Loading';
import AppColors from '../../commons/AppColors';
import BackBarButton from '../../components/BackBarButton';

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
    let url = this.props.url;

    return (
      <View style={styles.container}>
          <NavigationBar
            title = {{title:this._getNavgationTitle(), tintColor: 'white'}} 
            titleTextColor='white'
            statusBar={{style: 'light-content'}}
            tintColor={AppColors.major}
            leftButton={<BackBarButton onPress= {() => this._onLeftButtonTapped()} />} 
          />
          <WebView style={styles.webview} 
            source={{uri: url}}
            startInLoadingState={true}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            >
          </WebView>
      </View>
    );
  }

  _getNavgationTitle() {
    let maxLength = 16;
    let title = this.props.title;
    return title = title.length > maxLength ? title.substring(0,maxLength) + "..." : title;
  }

  _onLeftButtonTapped() {
      this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
   container: {
      flex:1, 
      backgroundColor:'white',
   },

   webview: {
      flex:1,
      backgroundColor:'white',
   }

});