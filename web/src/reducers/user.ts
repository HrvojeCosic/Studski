interface UserState {
	currentUser: string;
}
const initialState = {
	currentUser: '',
	currentUserPoints: 0,
	currentUserPosts: [],
};

//TODO: reducer, action TYPES
const userReducer: any = (state: UserState = initialState, action: any) => {
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
