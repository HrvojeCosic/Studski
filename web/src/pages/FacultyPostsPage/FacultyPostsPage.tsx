import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Post } from '../../reducers/user';
import './FacultyPostsPage.scss';

interface FacultyParams {
	facultyName: string;
}

export const FacultyPostsPage: React.FC = () => {
	const [posts, setPosts] = useState<Array<Post>>([]);
	const params: FacultyParams = useParams();

	const displayPosts = posts.map((post: Post) => {
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
			.get(
				`http://localhost:8000/api/posts/getFacultyPosts/${params.facultyName}`
			)
			.then(res => {
				setPosts(res.data);
			})
			.catch(err => {
				alert(err.response.data.error);
			});
	}, []);

	return (
		<div>
			<h1>{params.facultyName}</h1>
			{displayPosts}
		</div>
	);
};
