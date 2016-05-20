'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	loading: false,
	typeList: {}
};

export default function category(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_CURRENT_DATA:
			var devices_num = 0;
			var devices_id = [];
			var devices_name = [];
			var devices_unit = [];
			var devices_value = [];
			action.res.forEach((dev) => {
				devices_num++;
				devices_id.push(dev.DEVICECODE);
				devices_name.push(dev.DEVICENAME);
				devices_unit.push(dev.UNIT);
				devices_value.push(dev.VALUE);
			});
			return Object.assign({}, state, {
				soilCurrentData: {
					devices_num,
					devices_id,
					devices_name,
					devices_unit,
					devices_value,
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
