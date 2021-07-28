import Cookies from 'js-cookie';
import { createStore } from 'redux';

export interface UserState {
	currentUser: string;
}
export interface Action {
	type: string;
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

//TODO: reducer, action TYPES
export const userReducer: any = (
	state: UserState = initialState,
	action: any
) => {
	switch (action.type) {
		case 'REMOVE_USER':
			Cookies.remove('connect.sid');
			return (state.currentUser = '');
	}
};

export const store = createStore(userReducer);

//LOG THE STATE WHEN ACTION IS DISPATCHED
store.subscribe(() => {
	console.log(store.getState());
});
