'use strict';

type Callback = {
  onSuccess: (data: any) => Void;
  onFailed: (err: any) => Void;
};

const DEBUG = true;
const BASE_API = DEBUG ? 'https://zhuanlan.zhihu.com/api/columns/pinapps' : 'https://zhuanlan.zhihu.com/api/columns/pinapps/posts';
const API_HEADER = {'Accept': 'application/json', 'Content-Type': 'application/json'};


export function get(url:string, params:any=null, callback: Callback) {
  request(url, 'GET', params, callback);
}

export function post(url:string, params:any=null, callback: Callback) {
  request(url, 'POST', params, callback);
}

async function request(url:string, method:string, params:any, callback:Callback) {
  try {
    let api = BASE_API + url;
    let data = {};
    
    data.method = method;
    data.headers = API_HEADER;

    if (method === 'POST' && params) {
       data.body = JSON.stringify(params);
    } else {
        api = _buildAbsoluteURI(api, params);
    }

    console.log(api);

    let response = await fetch(api, data);
    let responseJson = await response.json();

    if (DEBUG) {
      callback.onSuccess(responseJson);
    } else {
      callback.onSuccess(responseJson);
    }
    
  } catch(error) {
    console.error(error);
    callback.onFailed(error);
  }
}

function _buildAbsoluteURI(api, json) {
	let params = Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');

	if (api.indexOf("?") > 0) {
		return api + '&' + params;
	}
    return api + '?' + params;
        
}
