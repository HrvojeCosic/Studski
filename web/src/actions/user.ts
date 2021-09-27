import Cookies from 'js-cookie';
import { store } from '..';
import { Post, User } from '../reducers/user';

interface SetUserAction {
	type: string;
	payload: object;
}
export const setUser = (
	username: string,
	points: number,
	posts: Array<Post>,
	loaded: boolean
): SetUserAction => {
	return {
		type: 'SET_USER',
		payload: { username, points, posts, loaded },
	};
};
export const removeUser = () => {
	Cookies.remove('connect.sid');
	return {
		type: 'REMOVE_USER',
		payload: { username: '', posts: [], points: null, loaded: true },
	};
};
export const updateUserPosts = (
	updateType: string,
	newPost?: Post,
	updatedPost?: Post,
	deletedPost?: Post
) => {
	const currentUser: User = store.getState().userState;

	if (updateType === 'add post' && newPost) {
		currentUser.posts.push(newPost);
	}

	if (updateType === 'delete post' && deletedPost) {
		const newPostsArray = currentUser.posts.filter(
			post => post.id !== deletedPost.id
		);
		currentUser.posts = newPostsArray;
	}

	return {
		type: 'UPDATE_POSTS',
		payload: { currentUser },
	};
};
