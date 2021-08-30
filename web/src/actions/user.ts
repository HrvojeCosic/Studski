import Cookies from 'js-cookie';
import { Post, User } from '../reducers/user';

interface SetUserAction {
	type: string;
	payload: object;
}
export const setUser = (
	username: string,
	points: number,
	posts: Array<Post>
): SetUserAction => {
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
	localStorage.removeItem('currentUser');
	return {
		type: 'REMOVE_USER',
		payload: { user: '' },
	};
};
export const updateUserPosts = (
	updateType: string,
	newPost?: Post,
	updatedPost?: Post
) => {
	const currentUserStringified = localStorage.getItem('currentUser') || '{}';
	const currentUser: User = JSON.parse(currentUserStringified);

	if (updateType === 'add post' && newPost) {
		currentUser.posts.push(newPost);
	}

	if (updateType === 'upvote post' && updatedPost) {
		const indexToUpdate = currentUser.posts.findIndex(
			post => post.id === updatedPost.id
		);
		currentUser.posts[indexToUpdate].points++;
		currentUser.points++;
	}

	if (updateType === 'downvote post' && updatedPost) {
		const indexToUpdate = currentUser.posts.findIndex(
			post => post.id === updatedPost.id
		);
		currentUser.posts[indexToUpdate].points--;
		currentUser.points--;
	}

	localStorage.setItem('currentUser', JSON.stringify(currentUser));

	return {
		type: 'UPDATE_POSTS',
		payload: { currentUser },
	};
};
