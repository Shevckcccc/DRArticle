/*
 * app的全局navigator
 *
 * created by crazysheep 2016.08.10
 */
'use strict';

import React, {Component} from 'react';
import { Navigator, } from 'react-native';
import {connect} from 'react-redux';

import {navInit, setTabBarHidden} from '../actions/index';
import TabNav from './TabNav';

class AppNav extends Component {
  constructor(props) {
    super(props);

    this._onNavigationBarWillFocus = this._onNavigationBarWillFocus.bind(this);
    this._onNavigationBarDidFocus = this._onNavigationBarDidFocus.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(navInit(this.navigator));
  }

  render() {
    return(
      <Navigator
        ref={ref => this.navigator = ref}
        initialRoute={{
          id: 'TabNav',
          name: 'TabNav',
          title: '首页',
        }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={this._renderScene}
      />
    );
  }

  _renderScene(route, navigator) {
    switch(route.id) {
      case 'TabNav': {
        return <TabNav />
      }

      default: {
        console.log('_renderScene, route: ' + JSON.stringify(route));
        let Component = route.component;
        return (
          <Component {...route.passProps}
            title={route.title}
            navigator={navigator}
          />
        )
      }
    }
  }

  // 控制tabbar隐藏/显示，此处也可以直接写state状态，redux只作学习用
  _onNavigationBarWillFocus(route) {
    if (route.name === 'HomeDetail') {
      this.props.dispatch(setTabBarHidden(true));
    }
    else if (route.name === 'FollowingDetail') {
      this.props.dispatch(setTabBarHidden(true));
    }
    else if (route.name === 'FollowingAdd') {
      this.props.dispatch(setTabBarHidden(true));
    }
  }

  // 显示放到did里面因为会有will会有一点卡顿
  _onNavigationBarDidFocus(route) {
    let dispatch = this.props.dispatch;
    if (route.name === 'HomePage') {
       dispatch(setTabBarHidden(false));
    }
    else if (route.name === 'FollowingPage') {
       dispatch(setTabBarHidden(false));
    }
  }
}

module.exports = connect((store) => ({}))(AppNav)
