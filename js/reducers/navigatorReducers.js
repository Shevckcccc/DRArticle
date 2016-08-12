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
      return {
        ...state,
        navigator: action.navigator,
      }
    }

    case NAV_TO_FOLLOWING_ADD: {
      var curRoute = getCurrentRoute(state.navigator);
      var nextRoute = {
        name: 'FollowingAdd',
        component: FollowingAdd,
        title: '添加订阅',
      }
      logRoute(curRoute, nextRoute);
      state.navigator.push({
        ...nextRoute,
        passProps: {
          preRoute: curRoute,
          currentRoute: nextRoute,
        },
      });
      return state;
    }

    case NAV_TO_HOME_DETAIL: {
      var curRoute = getCurrentRoute(state.navigator);
      var nextRoute = {
        name: 'HomeDetail',
        component: ArticleDetail,
        title: action.article.title,
      }
      logRoute(curRoute, nextRoute);
      state.navigator.push({
        ...nextRoute,
        passProps: {
          url: 'https://zhuanlan.zhihu.com' + action.article.url,
          preRoute: curRoute,
          currentRoute: nextRoute,
        }
      });
      return state;
    }

    case NAV_POP: {
      var curRoute = getCurrentRoute(state.navigator);
      console.log('navigatorReducers, pop route: ' + JSON.stringify(curRoute));
      state.navigator.pop();
      return state;
    }

    default:
      return state;
  }
}

function logRoute(preRoute, nextRoute) {
  console.log('navigatorReducers, start route: ' + JSON.stringify(preRoute)
    + ', next route: ' + JSON.stringify(nextRoute));
}

function getCurrentRoute(navigator) {
  var routes = navigator.getCurrentRoutes();
  return routes[routes.length - 1];
}
