export interface Post {
	author: string;
	faculty: string;
	title: string;
	points: number;
	createdAt: Date;
	id: number;
	fileName: string;
}
export interface User {
	username: string;
	points: number;
	posts: Array<Post>;
	sid: string;
}

interface UserAction {
	type: string;
	payload: {
		user: User;
		currentUser: User;
		username: string;
		points: number;
		posts: Post[];
	};
}

export const initialUserState = {
	username: '',
	points: 0,
	posts: [],
	sid: '',
};

const userReducer = (state: User = initialUserState, action: UserAction) => {
	switch (action.type) {
		case 'SET_USER':
			const { username, points, posts } = action.payload;
			return { username, points, posts };
		case 'REMOVE_USER':
			return action.payload;
		case 'UPDATE_POSTS':
			return action.payload.currentUser;
		default:
			return state;
	}
};

export default userReducer;
