import React from 'react';
import { useParams } from 'react-router';
import './FacultyPostsPage.scss';

interface FacultyParams {
	facultyName: string;
}

export const FacultyPostsPage: React.FC = () => {
	let params: FacultyParams = useParams();

	return (
		<div>
			<h1>{params.facultyName}</h1>
		</div>
	);
};
