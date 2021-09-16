import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from '../../reducers/user';
import './PostsPages.scss';
import { NavBar } from '../../components/NavBar/NavBar';

interface FacultyParams {
	facultyName: string;
}

export const FacultyPostsPage: React.FC = () => {
	const [postsJSX, setPostsJSX] = useState<Array<JSX.Element>>([]);
	const params: FacultyParams = useParams();

	const history = useHistory();

	useEffect(() => {
		//SET DUMMY POST LIST WHILE LOADING
		let loadingTemplatePostList: Array<JSX.Element> = [];
		for (let i = 0; i < 5; i++) {
			loadingTemplatePostList.push(
				<div key={i}>
					<div className='post-container loading'>
						<div className='post-main'>
							<div className='post-upper-info'>
								<p>{i}</p>
								<p>{i}</p>
							</div>
							<p className='post-title'>{i}</p>
							<p>{i}</p>
						</div>
						<div className='post-side'>
							<p>{i}</p>
						</div>
					</div>
				</div>
			);
		}
		setPostsJSX(loadingTemplatePostList);

		axios
			.get(`/posts/getFacultyPosts/${params.facultyName}`)
			.then(res => {
				setPostsJSX(
					res.data.posts.map((post: Post) => {
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
										<img src='../../icons/otherIcons/heart.png' alt='' />
										<p>{post.points}</p>
									</div>
								</div>
							</Link>
						);
					})
				);
			})
			.catch(err => {
				alert(err.response.data.error);
				history.push('/');
			});
	}, [params.facultyName, history]);

	return (
		<div className='posts-page-container'>
			<NavBar />
			<h1 style={{ fontWeight: 400 }}>{params.facultyName}</h1>
			{postsJSX}
		</div>
	);
};
