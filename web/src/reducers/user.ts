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
	sid: string;
	loaded: boolean;
}

interface UserAction {
	type: string;
	payload: {
		user: User;
		currentUser: User;
		username: string;
		points: number;
		posts: Post[];
		loaded: boolean;
	};
}

export const initialUserState = {
	username: '',
	points: 0,
	posts: [],
	sid: '',
	loaded: false,
};

const userReducer = (state: User = initialUserState, action: UserAction) => {
	switch (action.type) {
		case 'SET_USER':
			const { username, points, posts, loaded } = action.payload;
			return { username, points, posts, loaded };
		case 'REMOVE_USER':
			return action.payload;
		case 'UPDATE_POSTS':
			return action.payload.currentUser;
		default:
			return state;
	}
};

export default userReducer;
