'use strict';

export const TOGGLE_TABBAR = 'TOGGLE_TABBAR';

export function setTabBarHidden(hidden) {
  return {
   	type: TOGGLE_TABBAR,
   	hidden,
  };
}
