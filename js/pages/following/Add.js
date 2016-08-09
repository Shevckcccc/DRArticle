'use strict';

import React, { Component } from 'react';
import { View, Text, ListView, Image, TouchableHighlight, StyleSheet, RefreshControl } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Loading from '../../components/Loading';
import AuthorCell from '../../components/AuthorCell';
import HomeBanner from '../../components/HomeBanner';
import { getArticles } from '../../network';
import AppColors from '../../common/AppColors';
import FollowingDetail from './Detail.js';
import BackBarButton from '../../components/BackBarButton';

export default class FollowingAdd extends Component {
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

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(offset = 0) {
    offset *= this.state.pageLimit;
    getArticles({offset:offset, limit:this.state.pageLimit}, {
      onSuccess: (responseData) => {
        let authors = responseData ;

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
            leftButton={<BackBarButton onPress= {() => this._onLeftButtonTapped()} />} 
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
          style={styles.listView}
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
      <AuthorCell 
        onSelect={(author) => {this._didSelectRow(author);}}
        onAddAuthor = {() => {this._didSelectAddAuthor();}}
        author={rowData}
      />
    );
  }

  _didSelectRow(author) {
    this.props.navigator.push({
      name: 'FollowingDetail',
      component: FollowingDetail,
      title: author.author.name,
      passProps: {
        author: author,
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
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },

  listView: {
     flex:1,
     marginTop: 0,
     backgroundColor: '#f5f5f5',
     marginBottom: 0,
  }
});

