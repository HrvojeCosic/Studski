import React, { useEffect, useState } from 'react';
import './FacultyList.scss';

interface Faculty {
	ime: String;
	grad: String;
	id: number;
}

export const FacultyList: React.FC = () => {
	const [faculties, setFaculties] = useState([]);
	useEffect(() => {
		fetch('faculties.json')
			.then(res => {
				return res.json();
			})
			.then(json => {
				setFaculties(json);
			});
	}, []);

	const facultyList = faculties.map((faculty: Faculty) => {
		return <p key={faculty.id}> {faculty.ime} </p>;
	});

	return (
		<div className='faculty-list-container'>
			<h1>Fakulteti</h1>
			{facultyList}
		</div>
	);
};
