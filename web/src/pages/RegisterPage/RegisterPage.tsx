import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [email, setEmail] = useState('');

	const createUser = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		const newUser = {
			username,
			password,
			repeatPassword,
			email,
		};
		axios
			.post('http://localhost:8000/api/users/register', newUser)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err.response.data.error);
			});
	};
	return (
		<div className='sign-up-container'>
			<h2>Create a new account</h2>
			<form className='loginbox'>
				<input
					placeholder='Username'
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
					placeholder='Password'
					type='password'
					value={password}
					onChange={e => {
						setPassword(e.target.value);
					}}
				/>
				<input
					placeholder='Repeat password'
					type='password'
					value={repeatPassword}
					onChange={e => {
						setRepeatPassword(e.target.value);
					}}
				/>
				<button onClick={createUser}>
					<p>Sign Up</p>
				</button>
				<Link to='/'>
					<button className='back-to-hp2'>Back to home page</button>
				</Link>
			</form>
		</div>
	);
};
