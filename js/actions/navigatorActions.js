/*
 * 专注Navigator的actions
 *
 * created by crazysheep 2016.08.10
 */
'use strict';

export const NAV_INIT = 'nav_init';
export const NAV_TO_FOLLOWING_ADD = 'nav_to_following_add';
export const NAV_TO_HOME_DETAIL = 'nav_to_home_detail';

export function navInit(navigator) {
  return {
    type: NAV_INIT,
    navigator,
  }
}

export function navToFollowingAdd() {
  return {
    type: NAV_TO_FOLLOWING_ADD,
  };
}

export function navToHomeDetail(article) {
  return{
    type: NAV_TO_HOME_DETAIL,
    article,
  }
}
