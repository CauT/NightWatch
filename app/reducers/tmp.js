'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	loading: false,
	typeList: {}
};

export default function category(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_CURRENT_DATA:
			var devicesInfo = [];
			var k;
			for (var i = 0; i < action.res.length / 3; i++) {
				var rowInfo = [];
				for (var j = 0; j < 3; j++) {
					k = 3 * i + j;
					rowInfo.push(action.res[k]);
				}
				devicesInfo.push(rowInfo);
			}
			return Object.assign({}, state, {
				soilCurrentData: {
					devicesInfo,
				}
			});
		case types.RECEIVE_TYPE_LIST:
			return Object.assign({}, state, {
				loading: false,
				typeList: action.typeList
			});
		default:
			return state;
	}
}
