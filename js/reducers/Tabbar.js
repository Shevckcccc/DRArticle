'use strict';

import { TOGGLE_TABBAR } from '../actions';

const initState = {
  isTabBarHidden: false,
}

export function tabState(state = initState, action) {
  switch (action.type) {
    case TOGGLE_TABBAR:
      return {
        ...state,
        isTabBarHidden: action.hidden,
      }
    default:
      return state;
  }
}
