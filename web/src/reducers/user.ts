import Cookies from 'js-cookie';

interface UserState {
	currentUser: string;
}
const initialState = {
	currentUser: '',
};

//TODO: reducer, action TYPES
const userReducer: any = (state: UserState = initialState, action: any) => {
	switch (action.type) {
		case 'SET_USER':
			return action.payload.username;
		case 'REMOVE_USER':
			Cookies.remove('connect.sid'); //TODO: remove side effect?
			return '';
		case 'GET_USER':
			const sid = Cookies.get('connect.sid'); //TODO: remove side effect?
			return sid;
		default:
			return state;
	}
};

export default userReducer;
