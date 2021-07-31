import React from 'react';
import './LoggedUserInfo.scss';
import { User } from '../../actions/user';

export const LoggedUserInfo: React.FC = () => {
	const currentUserStringified = localStorage.getItem('currentUser') || '{}'; //if getItem() returns null, variable is = '{}'
	const userState: User = JSON.parse(currentUserStringified);
	const { username, points, posts } = userState;

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
