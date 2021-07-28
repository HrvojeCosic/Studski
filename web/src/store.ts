import Cookies from 'js-cookie';
import { createStore } from 'redux';

export interface UserState {
	currentUser: string;
}

export const initialState = {
	currentUser: 'asd',
};

//ACTIONS
export const removeUser = () => {
	return {
		type: 'REMOVE_USER',
	};
};
export const getUser = () => {
	return {
		type: 'GET_USER',
	};
};

//TODO: reducer, action TYPES
export const userReducer: any = (
	state: UserState = initialState,
	action: any
) => {
	switch (action.type) {
		case 'REMOVE_USER':
			Cookies.remove('connect.sid');
			return '';
		case 'GET_USER':
			const sid = Cookies.get('connect.sid');
			return sid;
	}
};

export const store = createStore(userReducer);
