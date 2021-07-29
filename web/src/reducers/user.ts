interface UserState {
	currentUser: string;
}
const initialState = {
	currentUser: '',
};

//TODO: reducer, action TYPES
const userReducer: any = (state: UserState = initialState, action: any) => {
	switch (action.type) {
		case 'SET_USER':
			return action.payload.username;
		case 'REMOVE_USER':
			return action.payload.user;
		case 'GET_USER':
			return action.payload.sid;
		default:
			return state;
	}
};

export default userReducer;
