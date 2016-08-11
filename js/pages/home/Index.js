'use strict';

import React, { Component } from 'react';
import {
  View, Text, ListView, Image, TouchableHighlight,
  StyleSheet, RefreshControl, AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from 'react-native-navbar';
import Loading from '../../components/Loading';
import ArticleCell from '../../components/ArticleCell';
import ArticleDetail from './Detail.js';
import HomeBanner from '../../components/HomeBanner';
import { getArticles } from '../../network';
import AppColors from '../../common/AppColors';
import {navToHomeDetail} from '../../actions/index';

const KEY_READED_ARTICLES = 'key_readed_articles';

class HomePage extends Component {
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

    this._didSelectRow = this._didSelectRow.bind(this);
    this._getReadedArticles();
  }

  componentWillMount() {
    this._fetchData();
  }

  _fetchData(offset = 0) {
    offset *= this.state.pageLimit;
    getArticles({offset:offset, limit:this.state.pageLimit}, {
      onSuccess: (responseData) => {
        let hasMore = responseData.length == this.state.pageLimit;
        var temp = offset == 0 ? responseData : this.state.articles.concat(responseData);
        let nextOffset = offset == 0 ? 1 : ++this.state.pageOffset;
        let articles = temp.map((item, index) => {
          return {
            ...item,
            isReaded: this.readedArticles.has(item.url),
          }
        });

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
          />);

    if(!this.state.loaded) {
      return (
        <View>
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

  _renderRow(rowData: object, sectionID: number) {
    return (
      <ArticleCell
        cellContainerStyle={{backgroundColor: rowData.isReaded ? '#eeeeee' : 'white'}}
        onSelect={(article) => {this._didSelectRow(rowData);}}
        article={rowData}
      />
    );
  }

  _renderHeader() {
    return (
      <HomeBanner
        banners={this._getBannersData()}
        onSelect = {(rowData) => {this._didSelectRow(rowData);}}
      />
    );
  }

  _didSelectRow(article) {
    this.readedArticles.add(article.url);
    var newArticles = this.state.articles.slice();
    for(var i = 0; i < newArticles.length; i++) {
      if(this.state.articles[i] == article) {
        newArticles[i] = {
          ...this.state.articles[i],
          isReaded: true,
        };
      }
    }
    let dataSource = this.state.dataSource.cloneWithRows(newArticles);
    this.setState({
      articles: newArticles,
      dataSource: dataSource,
    })
    this._saveReadedArticles();
    //this.props.dispatch(navToHomeDetail(article));
  }

  // 取Banner的标题、链接和图片
  _getBannersData(){
      let articles = this.state.articles;
      let banners = articles.slice(0, 5);
      return banners;
  }

  _getReadedArticles() {
    // 获取本地保存的已读列表
    AsyncStorage.getItem(KEY_READED_ARTICLES)
      .then(str => str == null ? [] : str.split(';'))
      .then(arrays => {
        this.readedArticles = new Set(arrays);
        console.log('本地保存已读文章: ' + JSON.stringify(arrays));
      })
      .done();
  }

  _saveReadedArticles() {
    var arrayString = this._formatSet2String(this.readedArticles);
    console.log('save readed articles: ' + arrayString);
    AsyncStorage.setItem(KEY_READED_ARTICLES, arrayString)
      .done();
  }

  _formatSet2String(set) {
    var ss = '';
    set.forEach(value => {
      ss += value + ';';
    });
    ss.substring(0, ss.length - 1);
    return ss;
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
    overflow: 'hidden',
  },

  listView: {
     flex:1,
     marginTop: 0,
     backgroundColor: '#f5f5f5',
     marginBottom: 0,
  }
});

module.exports = connect((store) => ({}))(HomePage)
