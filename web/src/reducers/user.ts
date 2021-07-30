import { User } from '../actions/user';

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
		default:
			return state;
	}
};

export default userReducer;
