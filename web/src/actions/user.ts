import Cookies from 'js-cookie';

interface SetUser {
	type: string;
	payload: object;
}
interface Post {
	author: string;
	faculty: string;
	title: string;
	points: number;
	createdAt: Date;
	user_id: number;
}

export const setUser = (
	username: string,
	points: number,
	posts: Post
): SetUser => {
	return {
		type: 'SET_USER',
		payload: { username, points, posts },
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
