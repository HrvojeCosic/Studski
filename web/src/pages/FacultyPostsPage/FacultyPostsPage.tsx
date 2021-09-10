import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import './FacultyPostsPage.scss';
import { NavBar } from '../../components/NavBar/NavBar';

interface FacultyParams {
	facultyName: string;
}

export const FacultyPostsPage: React.FC = () => {
	const [posts, setPosts] = useState<Array<Post>>([]);
	const params: FacultyParams = useParams();

	const postsJSX = posts.map((post: Post) => {
		return (
			<Link to={`/materijal/${post.id}`} key={post.id}>
				<div className='post-container'>
					<div className='post-main'>
						<div className='post-upper-info'>
							<p>{post.author}</p>
							<p>{post.createdAt}</p>
						</div>
						<p className='post-title'>{post.title}</p>
						<p>{post.fileName}</p>
					</div>
					<div className='post-side'>
						<img src='../../icons/otherIcons/heart.png' />
						<p>{post.points}</p>
					</div>
				</div>
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
	}, [params.facultyName]);

	return (
		<div className='faculty-page-container'>
			<NavBar />
			<h1 style={{ fontWeight: 400 }}>{params.facultyName}</h1>
			{postsJSX}
		</div>
	);
};
