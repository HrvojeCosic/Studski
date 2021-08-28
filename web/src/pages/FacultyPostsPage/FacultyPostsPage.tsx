import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import './FacultyPostsPage.scss';

interface FacultyParams {
	facultyName: string;
}

export const FacultyPostsPage: React.FC = () => {
	const [posts, setPosts] = useState<Array<Post>>([]);
	const params: FacultyParams = useParams();

	const postsJSX = posts.map((post: Post) => {
		return (
			<Link to={`/materijal/${post.id}`} key={post.id}>
				<p>{post.author}</p>
				<p>{post.title}</p>
				<p>{post.points}</p>
				<p>{post.createdAt}</p>
				<p>{post.fileName}</p>
			</Link>
		);
	});

	useEffect(() => {
		axios
			.get(
				`http://localhost:8000/api/posts/getFacultyPosts/${params.facultyName}`
			)
			.then(res => {
				setPosts(res.data.posts);
			})
			.catch(err => {
				alert(err.response.data.error); //TODO: create an error page OR redirect back
			});
	}, []);

	return (
		<div>
			<h1>{params.facultyName}</h1>
			{postsJSX}
		</div>
	);
};
