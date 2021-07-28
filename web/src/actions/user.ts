interface SetUser {
	type: string;
	payload: object;
}

export const setUser = (username: string): SetUser => {
	return {
		type: 'SET_USER',
		payload: { username },
	};
};
export const removeUser = () => {
	return {
		type: 'REMOVE_USER',
	};
};
export const getUser = () => {
	return {
		type: 'GET_USER',
	};
};
