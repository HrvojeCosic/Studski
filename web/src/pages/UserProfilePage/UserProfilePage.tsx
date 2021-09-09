import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import './UserProfilePage.scss';
import { NavBar } from '../../components/NavBar/NavBar';

interface UserParams {
	username: string;
}

export const UserProfilePage: React.FC = () => {
	const [posts, setPosts] = useState<Array<Post>>([]);
	const params: UserParams = useParams();

	const postsJSX = posts.map((post: Post) => {
		return (
			<Link to={`/materijal/${post.id}`} key={post.id}>
				<p>{post.title}</p>
				<p>{post.points}</p>
				<p>{post.createdAt}</p>
				<p>{post.fileName}</p>
			</Link>
		);
	});

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/getUserPosts/${params.username}`)
			.then(res => {
				setPosts(res.data.posts);
			})
			.catch(err => {
				alert(err.response.data.error); //TODO: create an error page OR redirect back
			});
	}, [params.username]);

	return (
		<div>
			<NavBar />
			<h1>{params.username}</h1>
			{postsJSX}
		</div>
	);
};
