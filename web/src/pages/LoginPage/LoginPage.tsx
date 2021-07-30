import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.scss';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/user';

export const LoginPage: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const dispatch = useDispatch();
	const history = useHistory();

	const login = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		const userCheck = {
			username,
			password,
		};
		axios
			.post('http://localhost:8000/api/users/login', userCheck, {
				withCredentials: true,
			})
			.then(res => {
				const { username, points } = res.data.userInfo;
				const { userPosts } = res.data;
				setErrorMsg('');
				history.push('/');
				dispatch(setUser(username, points, userPosts));
			})
			.catch(err => {
				setErrorMsg(err.response.data.error);
			});
	};
	return (
		<div>
			<div className='log-in-page-container'>
				<div className='log-in-contents-container'>
					<h2>Prijava</h2>
					<form className='loginbox'>
						<input
							placeholder='Korisničko ime'
							type='text'
							onChange={e => {
								setUsername(e.target.value);
							}}
						/>
						<input
							placeholder='Lozinka'
							type='password'
							onChange={e => {
								setPassword(e.target.value);
							}}
						/>
						<button id='submit' onClick={login}>
							Prijavi se
						</button>
					</form>
					<p className={errorMsg.length > 0 ? 'error-msg' : 'hide'}>
						{errorMsg}
					</p>
					<div className='links'>
						<Link to='/' className='back-to-hp'>
							Natrag na početnu stranicu
						</Link>
						<Link to='/registracija' className='sign-up-instead'>
							Nemaš račun? Registriraj se
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
