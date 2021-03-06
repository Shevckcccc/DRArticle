'use strict';

import React, { Component } from 'react';
import { View, Text, ListView, Image, TouchableHighlight, StyleSheet, RefreshControl } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Loading from '../../components/Loading';
import FollowingDetailCell from '../../components/FollowingDetailCell';
import ArticleDetail from '../home/Detail.js';
import AuthorHeader from '../../components/AuthorHeader';
import { getArticles } from '../../network';
import AppColors from '../../common/AppColors';
import BackBarButton from '../../components/BackBarButton';


export default class FollowingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      refreshing: false,
      loadingMore: false,
      hasMore: true,
      pageOffset: 0,
      pageLimit: 10,
    };
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(offset = 0) {
    offset *= this.state.pageLimit;
    getArticles({offset:offset, limit:this.state.pageLimit}, {
      onSuccess: (responseData) => {
        let hasMore = responseData.length == this.state.pageLimit;
        let articles = offset == 0 ? responseData : this.state.articles.concat(responseData);
        let nextOffset = offset == 0 ? 1 : ++this.state.pageOffset;

        this.setState({
          articles: articles,
          dataSource: this.state.dataSource.cloneWithRows(articles),
          loaded: true,
          refreshing: false,
          loadingMore: false,
          hasMore: hasMore,
          pageOffset: nextOffset,
        });
      },
      onFailed: (err) => {
        this.setState({
          loaded: true,
          refreshing: false,
          loadingMore: false,
        });
      }
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._fetchData();
  }

  _onLoadMore() {
    this.setState({loadingMore: true});
    if (this.state.refreshing) {
      return;
    }
    if (!this.state.hasMore) {
      return;
    }
    this._fetchData(this.state.pageOffset);
  }

  render() {
    let navigationBar = (<NavigationBar
            title= {{title:this.props.title, tintColor: 'white'}} 
            titleTextColor='white'
            statusBar={{style: 'light-content'}}
            tintColor={AppColors.major}
            leftButton={<BackBarButton onPress= {() => this._onLeftButtonTapped()} />} 
          />);

    if(!this.state.loaded) {
      return (
        <View style={styles.container}>
          {navigationBar}
          <Loading/>
        </View>
      );
    }
    return (
      <View style={styles.container}>

        {navigationBar}
        <ListView
          style = {styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={this._renderHeader.bind(this)}
          onEndReached={this._onLoadMore.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="gray"
              title="下拉刷新"
              titleColor="gray"
              colors={['blue', 'black', 'green']}
              progressBackgroundColor="yellow"
            />
          }
        />

      </View>
    );
  }

  _renderRow(rowData: string, sectionID: number) {
    return (
      <FollowingDetailCell 
        onSelect={(article) => {this._didSelectRow(article);}}
        article={rowData}
      />
    );
  }

  _renderHeader() {
    return (
      <AuthorHeader 
        author={this.props.author}
        onSelect = {(rowData) => {this._didSelectRow(rowData);}}
      />
    );
  }

  _didSelectRow(article) {
    this.props.navigator.push({
      name: 'HomeDetail',
      component: ArticleDetail,
      title: article.title,
      passProps: {
        url: 'https://zhuanlan.zhihu.com' + article.url,
      }
    });
  }

  _onLeftButtonTapped() {
      this.props.navigator.pop();
  }

}

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f5f5f5',
  },

  listView: {
     flex:1,
     marginTop: 0,
     backgroundColor: '#f5f5f5',
     marginBottom: 0,
  }
});

