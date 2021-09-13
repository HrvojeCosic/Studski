import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './RegisterPage.scss';

export const RegisterPage: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [email, setEmail] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState<boolean>(false);

	const history = useHistory();

	const createUser = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		setLoading(true);
		const newUser = {
			username,
			password,
			repeatPassword,
			email,
		};
		axios
			.post('http://localhost:8000/api/users/register', newUser)
			.then(() => {
				setErrorMsg('');
				setLoading(false);
				history.push('/');
			})
			.catch(err => {
				setErrorMsg(err.response.data.error);
				setLoading(false);
			});
	};
	return (
		<div className='sign-up-page-container'>
			<div className='sign-up-contents-container'>
				<h2>Novi korisnički račun</h2>
				<form className='loginbox'>
					<input
						placeholder='Korisničko ime'
						type='text'
						value={username}
						onChange={e => {
							setUsername(e.target.value);
						}}
					/>
					<input
						placeholder='E-mail'
						type='text'
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
					<input
						placeholder='Lozinka'
						type='password'
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<input
						placeholder='Lozinka'
						type='password'
						value={repeatPassword}
						onChange={e => {
							setRepeatPassword(e.target.value);
						}}
					/>
					<div className='links'>
						<button onClick={createUser} className='sign-up-btn'>
							{loading ? 'Učitavanje...' : 'Registriraj se'}
						</button>
						<p className={errorMsg.length > 0 ? 'error-msg' : 'hide'}>
							{errorMsg}
						</p>
						<Link to='/' className='back-to-hp'>
							Natrag na početnu stranicu
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
