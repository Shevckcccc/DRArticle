'use strict';

import React, {Component} from 'react';
import {View, StatusBar, NavigatorIOS, Image, StyleSheet, Navigator, Text} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {connect} from 'react-redux';

import HomePage from './home/Index';
import FollowingPage from './following/Index';
import AppColors from '../common/AppColors';
import {navInit} from '../actions/index';

class TabBarNav extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: 'article' };
  }

  render() {
    // 通过调用 connect() 注入:
    const { isTabBarHidden } = this.props;

    let homeIcon = require('../assets/image/TabHome.png');
    let homeIconSeleted = require('../assets/image/TabHomeSelected.png');
    let followingIcon = require('../assets/image/TabPlayground.png');
    let followingIconSeleted = require('../assets/image/TabPlaygroundSelected.png');

    let tabBarHeight = isTabBarHidden ? 0 : 44;

    return (
      <TabNavigator
        tabBarStyle = {[styles.tabbar, {height: tabBarHeight}]}
        sceneStyle={{ paddingBottom: tabBarHeight }}
        tintColor = {AppColors.major}>
        <TabNavigator.Item
          name="article"
          renderIcon={() => <Image source={homeIcon} />}
          renderSelectedIcon = {() => <Image source={homeIconSeleted} />}
          title="文章"
          accessibilityLabel="article"
          selectedTitleStyle = {styles.tab}
          tabStyle = {styles.firstTab}
          selected={this.state.selectedTab === 'article'}
          onPress={() => {
            this.setState({
              selectedTab: 'article',
            });
          }}>
          <HomePage title={'文章'}/>
        </TabNavigator.Item>

        <TabNavigator.Item
          name='following'
          renderIcon={() => <Image source={followingIcon} />}
          renderSelectedIcon = {() => <Image source={followingIconSeleted} />}
          title="订阅"
          accessibilityLabel='following'
          selectedTitleStyle = {styles.tab}
          selected={this.state.selectedTab === 'following'}
          onPress={() => {
            this.setState({
              selectedTab: 'following',
            });
          }}>
          <FollowingPage title={'订阅'}/>
        </TabNavigator.Item>
      </TabNavigator>
    )
  }
}

// 基于全局 state ，哪些是我们想注入的 props
function select(store) {
  return {
    isTabBarHidden: store.tabState.isTabBarHidden,
  };
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tab: {
    color: AppColors.major,
  },

  tabbar: {
     borderTopColor: AppColors.separator,
     borderTopWidth: 0.5,
     overflow: 'hidden',
  },

  firstTab: {
     borderRightColor: AppColors.separator,
     borderRightWidth: 0.5,
  }
});

module.exports = connect(select)(TabBarNav);
