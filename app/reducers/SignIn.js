'use strict';

import * as types from '../constants/ActionTypes';
import * as urls from '../constants/Urls';

const initialState = {
  isSignIn: false,
};

export default function category(state = initialState, action) {
	switch (action.type) {
		case types.INPUT_ACCOUNT:
      return Object.assign({}, state, {
        username: action.text,
      });

    case types.INPUT_PASSWORD:
      return Object.assign({}, state, {
        pwd: action.text,
      });

    case types.PRESS_NEED_HELP:
      return Object.assign({}, state, {
      });

    case types.IS_SIGNED_IN:
      return Object.assign({}, state, {
        isSignIn: action.res.ret.status === 'SUCCESS',
        token: action.res.token,
      });

    default:
      return state;
  }
}
