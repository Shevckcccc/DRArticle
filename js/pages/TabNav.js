'use strict';

import React, {Component} from 'react';
import {View, StatusBar, NavigatorIOS, Image, StyleSheet, Navigator} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import HomePage from './home/Index';
import FollowingPage from './following/Index';
import AppColors from '../commons/AppColors';

class TabBarNav extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: 'article' };
  }

  render() {

    let homeIcon = require('../assets/image/TabHome.png');
    let homeIconSeleted = require('../assets/image/TabHomeSelected.png');
    let followingIcon = require('../assets/image/TabPlayground.png');
    let followingIconSeleted = require('../assets/image/TabPlaygroundSelected.png');

    let tabBarHeight = 44;

    return (
       <TabNavigator
        tabBarStyle = {[styles.tabbar, {height: tabBarHeight}]}
        sceneStyle={{ paddingBottom: tabBarHeight }}
        tintColor = {AppColors.major}
      >
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
          <NavigatorIOS 
            style = {styles.container}
            barTintColor={AppColors.major}
            titleTextColor='white'
            tintColor='white'
            initialRoute={{
              title: '文章',
              component: HomePage,
            }}/>
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
            <NavigatorIOS 
              style = {styles.container}
              barTintColor={AppColors.major}
              titleTextColor='white'
              tintColor='white'
              initialRoute={{
                title: '订阅',
                component: FollowingPage,
              }} >
              </NavigatorIOS>
          </TabNavigator.Item>
        </TabNavigator>
    )
  }
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

module.exports = TabBarNav;