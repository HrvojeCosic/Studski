import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import './PostPage.scss';

interface PostParams {
	postID: string;
}

export const PostPage: React.FC = () => {
	const [post, setPost] = useState<any>({}); //"any" BECAUSE OF createdAt PROPERTY IN Post TYPE‚
	const [voted, setVoted] = useState('');
	const params: PostParams = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/getPost/${params.postID}`)
			.then(res => {
				setPost(res.data.post);
			})
			.catch(err => {
				alert(err.response.data.error); //TODO: create an error page OR redirect back
			});
	}, []);

	const voteForPost = () => {
		const postID = params.postID;
		const postAuthor = post.author;
		axios
			.patch('http://localhost:8000/api/posts/voteForPost', {
				postID,
				postAuthor,
			})
			.then(res => {
				setVoted(res.data.message);
				if (res.data.message === 'upvoted') post.points++;
				else if (res.data.message === 'downvoted') post.points--;
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div>
			<p>{post.author}</p>
			<p>{post.faculty}</p>
			<p>{post.title}</p>
			<p>{post.createdAt}</p>
			<p>{post.fileName}</p>
			<div onClick={voteForPost}>KORISNO - {voted}</div>
			<p>{post.points}</p>
		</div>
	);
};
