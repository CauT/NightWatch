'use strict';

import * as types from '../constants/ActionTypes';
import * as urls from '../constants/Urls';
import * as strings from '../constants/Strings';
import jsSHA from 'jssha';

var shaObj = new jsSHA('SHA-256', 'TEXT');

export function signInThenFetchToken() {
  return (dispatch, getState) => {
    shaObj.update(getState().signIn.pwd);
    return fetch(urls.SIGN_IN
      + 'username=' + getState().signIn.username + '&'
      + 'password=' + shaObj.getHash('HEX'))
		.then((response) => response.json())
		.then((json) => {
			dispatch({
				type: types.IS_SIGNED_IN,
				res: json,
			});
		})
		.catch((error) => {
			console.warn(error);
		});
  };
}
