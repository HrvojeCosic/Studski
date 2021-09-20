import { combineReducers } from 'redux';
import userReducer from './user';
import renderReducer from './render';

const allReducers = combineReducers({
	userState: userReducer,
	renderState: renderReducer,
});

export default allReducers;
