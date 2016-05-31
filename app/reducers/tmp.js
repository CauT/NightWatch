'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
	minYear: 2015, //已知数据库最小时间为2015年9月30日
	historicalDate: new Date(),
	graphStartDate: new Date(),
	graphEndDate: new Date(),
	isGraphDatePadHidden: [true, true, true, true],
	needExtendHistoricalPad: false,
	historicalPadState: [{
		name: 'isHistoricalDatePadHidden',
		bool: true,
	}, {
		name: 'isHistoricalTimePadHidden',
		bool: true,
	}]
};

function checkOnlyOnePadNotHidden(stateArray) {
	var res = 0;
	stateArray.forEach(function(state) {
		if (!state) {
			res++;
		}
	});
	return res <= 1;
}

export default function category(state = initialState, action) {
	switch (action.type) {

		case types.SET_YEAR_SELECTOR_STATE:
			console.log(state);
			state.historicalDate.setFullYear(action.selected);
			return Object.assign({}, state, {
				historicalDate: state.historicalDate,
			});

		case types.SWITCH_GRAPH_DATE_SELECT_PAD_STATE:
			var i = action.index;
			var toChange = !state.isGraphDatePadHidden[i];
			var isHidden = state.isGraphDatePadHidden.slice(0);
			isHidden[i] = toChange;
			if (!checkOnlyOnePadNotHidden(isHidden)) {
				for (var j in isHidden) {
					isHidden[j] = true;
				}
				isHidden[i] = toChange;
			}

			return Object.assign({}, state, {
				isGraphDatePadHidden: isHidden,
			});

		case types.SWITCH_DATE_SELECT_PAD_STATE:
			var obj = {
				historicalPadState: [{}, {}],
			};
			var fst = !state.historicalPadState[action.padIndex].bool;
			var snd = state.historicalPadState[1 - action.padIndex].bool;
			obj.historicalPadState[action.padIndex].bool = fst;
			obj.historicalPadState[action.padIndex].name =
				state.historicalPadState[action.padIndex].name;
			obj.historicalPadState[1 - action.padIndex].name =
				state.historicalPadState[1 - action.padIndex].name;

			if (fst === false && snd === false) {
				obj.historicalPadState[1 - action.padIndex].bool = true;
			} else {
				obj.historicalPadState[1 - action.padIndex].bool = snd;
			}

			obj.needExtendHistoricalPad = !(fst && snd);
			return Object.assign({}, state, obj);

    case types.SET_SELECTOR_STATE:
      var obj = {};
      obj[action.selectorName] = action.selected;
      return Object.assign({}, state, obj);

		case types.CHANGE_HISTORICAL_DATE:
			return Object.assign({}, state, {
				historicalDate: action.date,
			});

		case types.FETCH_CURRENT_DATA:
      // devices are grouped into sections that each contains 3
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

			var obj = {};
			obj[action.key] = devicesInfo;
			return Object.assign({}, state, obj);

		case types.FETCH_TYPE_LIST:
			var tmp = [{DEVICENAME: '所有'}];
      return Object.assign({}, state, {
        soilTypeList: tmp.concat(action.res),
      });

    case types.FETCH_STATION_LIST:
			var tmp = [{NAME: '所有'}];
      return Object.assign({}, state, {
        soilStationList: tmp.concat(action.res),
      });

		case types.CHANGE_GRAPH_START_DATE:
			return Object.assign({}, state, {
				graphStartDate: action.date,
			});

		case types.CHANGE_GRAPH_END_DATE:
			return Object.assign({}, state, {
				graphEndDate: action.date,
			});

		default:
			return state;
	}
}
