'use strict';

import HttpClient from './HttpClient';


getFollowings(params, callback) {
	HttpClient.get('/followings', params, callback);
}

module.exports = {getFollowings};
