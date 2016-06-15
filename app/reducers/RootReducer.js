'use strict';

import {combineReducers} from 'redux';
import soil from './Soil';
import signIn from './SignIn';

const rootReducer = combineReducers({
	soil,
	signIn,
});

export default rootReducer;
