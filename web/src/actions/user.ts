import Cookies from 'js-cookie';

interface SetUser {
	type: string;
	payload: object;
}
interface GetUser {
	type: string;
	payload: {
		sid: string;
		currentUser: {
			username: string;
			points: number;
			posts: Array<Post>;
		};
	};
}
export interface Post {
	author: string;
	faculty: string;
	title: string;
	points: number;
	createdAt: Date;
	id: number;
}
export interface User {
	username: string;
	points: number;
	posts: Array<Post>;
}

export const setUser = (
	username: string,
	points: number,
	posts: Post
): SetUser => {
	localStorage.setItem(
		'currentUser',
		JSON.stringify({ username, points, posts })
	);
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
export const getUser = (): GetUser => {
	let sid = Cookies.get('connect.sid');
	!sid ? (sid = '') : (sid = sid);

	const currentUserStringified = localStorage.getItem('currentUser') || '{}';
	const currentUser: User = JSON.parse(currentUserStringified);

	return {
		type: 'GET_USER',
		payload: { sid, currentUser },
	};
};
