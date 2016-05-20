'use strict';

import * as types from '../constants/ActionTypes';
// import {ToastShort} from '../utils/ToastUtils';
// import {request} from '../utils/RequestUtils';
import * as urls from '../constants/Urls';
// import {WEXIN_ARTICLE_LIST} from '../constants/Urls';


// export function fetchArticles(isRefreshing, loading, typeId, isLoadMore, page) {
// 	if (page == undefined) {
// 		page = 1;
// 	};
// 	return dispatch => {
// 		dispatch(fetchArticleList(isRefreshing, loading, isLoadMore));
// 		return request(WEXIN_ARTICLE_LIST + '?typeId=' + typeId + '&page=' + page, 'get')
//       .then((articleList) => {
//         dispatch(receiveArticleList(articleList.showapi_res_body.pagebean.contentlist, typeId));
//       })
//       .catch((error) => {
//         dispatch(receiveArticleList([], typeId));
//         ToastShort(error.message);
//       })
// 	}
// }

export function fetchCurrentData(stationId, typeId) {
	return dispatch => {
		return fetch(urls.SOIL_CURRENT_DATA)
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: types.FETCH_CURRENT_DATA,
				res: json,
			})
		})
		.catch((error) => {
			console.warn(error);
		});
	}
}

function returnCurrentData(json) {
	return {
		type: types.FETCH_CURRENT_DATA,
		res: json,
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
