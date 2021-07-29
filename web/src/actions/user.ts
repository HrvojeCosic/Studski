import Cookies from 'js-cookie';

interface SetUser {
	type: string;
	payload: object;
}

export const setUser = (username: string): SetUser => {
	return {
		type: 'SET_USER',
		payload: { username },
	};
};
export const removeUser = () => {
	Cookies.remove('connect.sid');

	return {
		type: 'REMOVE_USER',
		payload: { user: '' },
	};
};
export const getUser = () => {
	let sid = Cookies.get('connect.sid');
	!sid ? (sid = '') : (sid = sid);

	return {
		type: 'GET_USER',
		payload: { sid },
	};
};
