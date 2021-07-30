import React from 'react';
import { useSelector } from 'react-redux';
import './LoggedUserInfo.scss';
import { State } from '../../index';

export const LoggedUserInfo: React.FC = () => {
	const userState = useSelector((state: State) => state.userState);
	const { username, points, posts } = userState;
	console.log(userState);

	const userPosts = posts.map(post => {
		return (
			//TODO: style this div:
			<div>
				<p>Autor: {post.author}</p>
				<p>Fakultet: {post.faculty}</p>
				<p>Naslov: {post.title}</p>
				<p>Kolegijalnost: {post.points}</p>
				<p>Datum: {post.createdAt}</p>
			</div>
		);
	});

	return (
		<div className='logged-user-info-container'>
			<div className='logged-user-main'>
				<h3>{username}</h3>
				<div className='user-numbers'>
					<p>Kolegijalnost: {points}</p>
					<p>Broj objava: {posts.length}</p>
				</div>
			</div>
			<div className='logged-user-list'>
				<h3>Objave:</h3>
				{userPosts}
			</div>
		</div>
	);
};
