'use strict';

import * as types from '../constants/ActionTypes';
import * as urls from '../constants/Urls';

export function selectCurrentDataSelector(selector, selected) {
	return (dispatch, getState) => {
		dispatch(setSelectorState(selector, selected));
		dispatch(fetchCurrentData(getState().tmp.stationSelector,
			getState().tmp.typeSelector));
	};
}

export function setSelectorState(selector, selected) {
	return {
		selectorName: selector,
		selected: selected,
		type: types.SET_SELECTOR_STATE,
	};
}

export function fetchCurrentData(stationName, deviceType) {
	var url = urls.SOIL_CURRENT_DATA;
	if (stationName !== undefined) {
		url = url + 'stationName=' + stationName + '&';
	}

	if (deviceType !== undefined) {
		url = url + 'deviceType=' + deviceType + '&';
	}

	return dispatch => {
		return fetch(url)
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
