'use strict';

import { combineReducers } from 'redux';
import { TOGGLE_TABBAR } from '../actions';

export function setTabBarHidden(state = false, action) {
  switch (action.type) {
    case TOGGLE_TABBAR:
      return action.hidden;
    default:
      return state;
  }
}