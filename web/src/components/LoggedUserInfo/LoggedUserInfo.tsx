import React from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { State } from '../../index';
import { Post } from '../../reducers/user';
import './LoggedUserInfo.scss';

export const getUser = () => {
	let sid = Cookies.get('connect.sid');
	if (!sid) sid = '';

	const stringifiedCurrentUser = localStorage.getItem('currentUser');
	if (!stringifiedCurrentUser) {
		return { username: '', points: 0, posts: [], sid };
	}

	let currentUser = JSON.parse(stringifiedCurrentUser);
	currentUser.sid = sid;
	return currentUser;
};

export const LoggedUserInfo: React.FC = () => {
	const { username, points, posts } = getUser();
	useSelector((state: State) => state);

	let userPosts;
	if (posts) {
		userPosts = posts.map((post: Post) => {
			return (
				//TODO: style this div:
				<div key={post.id} className='user-post'>
					<p>Autor: {post.author}</p>
					<p>Fakultet: {post.faculty}</p>
					<p>Naslov: {post.title}</p>
					<p>Kolegijalnost: {post.points}</p>
					<p>Datum: {post.createdAt}</p>
				</div>
			);
		});
	} else userPosts = {};

	return (
		<div className='logged-user-info-container'>
			{!username ? (
				<p>prijavite se...</p>
			) : (
				<div>
					<div className='logged-user-main'>
						<h3>{username}</h3>
						<div className='user-numbers'>
							<p>Kolegijalnost: {points}</p>
							<p>Broj objava: {posts.length}</p>
						</div>
					</div>
					<div className='logged-user-list'>
						<h3 className='announce-text'>Objave:</h3>
						{userPosts}
					</div>
				</div>
			)}
		</div>
	);
};
