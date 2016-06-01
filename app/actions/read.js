'use strict';

import * as types from '../constants/ActionTypes';
import * as urls from '../constants/Urls';
import * as strings from '../constants/Strings';

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

export function fetchHistoricalData() {
	return (dispatch, getState) => {
		var url = urls.SOIL_HISTORICAL_DATA;
		var time = getState().tmp.historicalDate.getTime() / 1000;
		var stationName = getState().tmp.historicalStationSelector;
		var deviceType = getState().tmp.historicalTypeSelector;

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
