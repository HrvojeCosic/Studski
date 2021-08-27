import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Post } from '../../reducers/user';
import './UserProfilePage.scss';

interface UserParams {
	username: string;
}

export const UserProfilePage: React.FC = () => {
	const [posts, setPosts] = useState<Array<Post>>([]);
	const params: UserParams = useParams();

	const postsJSX = posts.map((post: Post) => {
		return (
			<div key={post.id}>
				<p>{post.author}</p>
				<p>{post.title}</p>
				<p>{post.points}</p>
				<p>{post.createdAt}</p>
				<p>{post.fileName}</p>
			</div>
		);
	});

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/getUserPosts/${params.username}`)
			.then(res => {
				setPosts(res.data);
			})
			.catch(err => {
				alert(err.response.data.error); //TODO: create an error page OR redirect back
			});
	}, []);

	return (
		<div>
			<h1>{params.username}</h1>
			{postsJSX}
		</div>
	);
};
