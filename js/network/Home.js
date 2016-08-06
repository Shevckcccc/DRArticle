'use strict';

import * as HttpClient from './HttpClient';

export function getArticles(params, callback){
	HttpClient.get('/posts', params, callback);
}

