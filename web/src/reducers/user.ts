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

const initialUserState = {
	username: '',
	points: 0,
	posts: [],
};

//TODO: reducer & action TYPES
const userReducer = (state: User = initialUserState, action: any) => {
	switch (action.type) {
		case 'SET_USER':
			const { username, points, posts } = action.payload;
			return { username, points, posts };
		case 'REMOVE_USER':
			return action.payload.user;
		case 'GET_USER':
			return action.payload.sid;
		case 'UPDATE_POSTS':
			return action.payload.currentUser;
		default:
			return state;
	}
};

export default userReducer;
