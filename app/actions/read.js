'use strict';

import * as types from '../constants/ActionTypes';
// import {ToastShort} from '../utils/ToastUtils';
// import {request} from '../utils/RequestUtils';
import * as urls from '../constants/Urls';
// import {WEXIN_ARTICLE_LIST} from '../constants/Urls';

export function fetchCurrentData(stationId, typeId) {
	return dispatch => {
		return fetch(urls.SOIL_CURRENT_DATA)
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: types.FETCH_CURRENT_DATA,
				res: json,
			});
		})
		.catch((error) => {
			console.warn(error);
		});
	};
}

export function fetchTypeList() {
	return dispatch => {
		return fetch(urls.SOIL_TYPE_LIST)
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: types.FETCH_TYPE_LIST,
				res: json,
			});
		})
		.catch((error) => {
			console.warn(error);
		});
	};
}

export function fetchStationList() {
	return dispatch => {
		return fetch(urls.SOIL_STATION_LIST)
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: types.FETCH_STATION_LIST,
				res: json,
			});
		})
		.catch((error) => {
			console.warn(error);
		});
	};
}

// function fetchArticleList(isRefreshing, loading, isLoadMore) {
// 	if (isLoadMore == undefined) {
// 		isLoadMore = false;
// 	};
// 	return {
// 		type: types.FETCH_ARTICLE_LIST,
// 		isRefreshing: isRefreshing,
// 		loading: loading,
// 		isLoadMore: isLoadMore
// 	}
// }
//
// function receiveArticleList(articleList, typeId) {
// 	return {
// 		type: types.RECEIVE_ARTICLE_LIST,
// 		articleList: articleList,
// 		typeId: typeId
// 	}
// }
