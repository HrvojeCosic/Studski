import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user';

const sid = Cookies.get('connect.sid');

const useAuth = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.post('/users/checkAuth', sid, {
				withCredentials: true,
			})
			.then(res => {
				const { username, points, posts } = res.data.user;
				dispatch(setUser(username, points, posts, true));
			})
			.catch(() => {
				dispatch(setUser('', 0, [], true));
			});
	}, [dispatch]);
};
export default useAuth;
