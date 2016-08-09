'use strict';

import React, { Component } from 'react';
import { View, Text, ListView, Image, TouchableHighlight, StyleSheet, RefreshControl } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Loading from '../../components/Loading';
import FollowingCell, { ADD_AUTHOR } from '../../components/FollowingCell';
import HomeBanner from '../../components/HomeBanner';
import { getArticles } from '../../network';
import AppColors from '../../common/AppColors';

export default class FollowingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
      refreshing: false,
      pageOffset: 0,
      pageLimit: 10,
    };
  }

  componentWillMount() {
    this._fetchData();
  }

  _fetchData(offset = 0) {
    offset *= this.state.pageLimit;
    getArticles({offset:offset, limit:this.state.pageLimit}, {
      onSuccess: (responseData) => {
        let authors = responseData ;
        // 增加【添加订阅】按钮
        authors.push(ADD_AUTHOR);

        this.setState({
          authors: authors,
          dataSource: this.state.dataSource.cloneWithRows(authors),
          loaded: true,
          refreshing: false,
        });
      },
      onFailed: (err) => {
        this.setState({
          loaded: true,
          refreshing: false,
        });
      }
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._fetchData();
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
          contentContainerStyle = {styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
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
      <FollowingCell 
        onSelect={(author) => {this._didSelectRow(author);}}
        onAddAuthor = {() => {this._didSelectAddAuthor();}}
        author={rowData}
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

  }

  _didSelectAddAuthor() {

  }

}

var styles = StyleSheet.create({
  container: {
    flex:1,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },

  listView: {
     flex:1,
     flexDirection: 'row',
     flexWrap: 'wrap',
     backgroundColor: '#f5f5f5',
     justifyContent: 'flex-start',
  }
});

