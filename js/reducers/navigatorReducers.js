/*
 * 专注navigator的reducers
 *
 * created by crazysheep 2016.08.10
 */
'use strict';

import {
  NAV_TO_FOLLOWING_ADD,
  NAV_INIT,
  NAV_TO_HOME_DETAIL,
  NAV_POP,
} from '../actions/index';
import ArticleDetail from '../pages/home/Detail';
import FollowingAdd from '../pages/following/Add';

const initNavState = {
  navigator: null,
}

export function navState(state = initNavState, action) {
  switch (action.type) {
    case NAV_INIT: {
      console.log('init nav: ' + (typeof action.navigator));
      return {
        ...state,
        navigator: action.navigator,
      }
    }

    case NAV_TO_FOLLOWING_ADD: {
      state.navigator.push({
        name: 'FollowingAdd',
        component: FollowingAdd,
        title: '添加订阅',
        passProps: {}
      });
      return state;
    }

    case NAV_TO_HOME_DETAIL: {
      state.navigator.push({
        name: 'HomeDetail',
        component: ArticleDetail,
        title: action.article.title,
        passProps: {
          url: 'https://zhuanlan.zhihu.com' + action.article.url,
        }
      });
      return state;
    }

    case NAV_POP: {
      state.navigator.pop();
      return state;
    }

    default:
      return state;
  }
}
