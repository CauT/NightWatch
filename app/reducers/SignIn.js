'use strict';

import * as types from '../constants/ActionTypes';
import * as urls from '../constants/Urls';

const initialState = {
  pwd: '',
  needAlert: false,
  isWaiting: false,
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

    case types.PRESS_SIGN_IN:
      return Object.assign({}, state, {
        isWaiting: true,
      });

    case types.IS_SIGNED_IN:
      var isSignIn = action.res.ret.status === 'SUCCESS';
      return Object.assign({}, state, {
        isSignIn: isSignIn,
        token: action.res.token,
        isWaiting: false,
        needAlert: true,
        alertTitle: '提示',
        alertText: isSignIn ? '登陆成功' : '登陆失败',
      });

    case types.ALERTED:
      return Object.assign({}, state, {
        needAlert: false,
      });

    default:
      return state;
  }
}
