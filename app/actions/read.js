'use strict';

import * as types from '../constants/ActionTypes';
import * as urls from '../constants/Urls';

export function selectDataSelector(isCurrent, selector, selected) {
	return (dispatch, getState) => {
		dispatch(setSelectorState(selector, selected));
		if (isCurrent) {
			dispatch(fetchCurrentData(getState().tmp.currentStationSelector,
				getState().tmp.currentTypeSelector));
		} else {
			dispatch(fetchHistoricalData(getState().tmp.historicalStationSelector,
				getState().tmp.historicalTypeSelector, 1443760000));
		}
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

	if (stationName !== undefined && stationName !== '所有') {
		url = url + 'stationName=' + stationName + '&';
	}

	if (deviceType !== undefined && deviceType !== '所有') {
		url = url + 'deviceType=' + deviceType + '&';
	}

	return dispatch => {
		return fetch(url)
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: types.FETCH_CURRENT_DATA,
				key: 'soilCurrentDevicesInfo',
				res: json,
			});
		})
		.catch((error) => {
			console.log(error);
		});
	};
}

export function fetchHistoricalData(stationName, deviceType, time) {
	var url = urls.SOIL_HISTORICAL_DATA;

	if (time === undefined) {
		return console.error('time should not be undefined');
	} else {
		url = url + 'time=' + time + '&';
	}

	if (stationName !== undefined && stationName !== '所有') {
		url = url + 'stationName=' + stationName + '&';
	}

	if (deviceType !== undefined && deviceType !== '所有') {
		url = url + 'deviceType=' + deviceType + '&';
	}

	return dispatch => {
		return fetch(url)
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: types.FETCH_CURRENT_DATA,
				key: 'soilHistoricalDevicesInfo',
				res: json,
			});
		})
		.catch((error) => {
			console.log(error);
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
