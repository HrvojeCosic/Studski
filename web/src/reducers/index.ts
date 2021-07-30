import { combineReducers } from 'redux';
import userReducer from './user';

const allReducers = combineReducers({
	userState: userReducer,
});

export default allReducers;
