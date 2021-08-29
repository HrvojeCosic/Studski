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
	const [voted, setVoted] = useState<boolean>(false);
	const [allowVote, setAllowVote] = useState<boolean>(true);
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

		const user = localStorage.getItem('currentUser');
		let username;
		if (!user) setAllowVote(false);
		else if (user) username = JSON.parse(user).username;

		axios
			.get(
				`http://localhost:8000/api/posts/checkVoted/${username}/${params.postID}`
			)
			.then(res => {
				if (res.data.message === 'already voted') setVoted(true);
				else if (res.data.message === 'has not voted') setVoted(false);
			});
	}, []);

	const voteForPost = () => {
		const postID = params.postID;
		const postAuthor = post.author;

		const user = localStorage.getItem('currentUser');
		let voter = '';
		if (user) voter = JSON.parse(user).username;

		axios
			.patch('http://localhost:8000/api/posts/voteForPost', {
				postID,
				postAuthor,
				voter,
			})
			.then(res => {
				if (res.data.message === 'upvoted') {
					post.points++;
					setVoted(true);
				} else if (res.data.message === 'downvoted') {
					post.points--;
					setVoted(false);
				}
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
			{allowVote ? (
				<div onClick={voteForPost}>
					<p className={voted ? 'voted' : 'non-voted'}>KORISNO</p>
				</div>
			) : (
				''
			)}
			<p>broj bodova: {post.points}</p>
		</div>
	);
};
