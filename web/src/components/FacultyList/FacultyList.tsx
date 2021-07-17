import React, { useEffect, useState } from 'react';
import './FacultyList.scss';

interface Faculty {
	ime: string;
	grad: string;
	id: number;
}
interface OrganizedFacultyList {
	facultyArea_org: string;
	facultiesInArea_org: string[];
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

	//GET UNIQUE AREAS(GRADOVI) IN SEPERATE ARRAY
	const facultyAreas: string[] = [];
	faculties.forEach((faculty: Faculty) => {
		if (!facultyAreas.includes(faculty.grad)) {
			facultyAreas.push(faculty.grad);
		}
	});

	//FOR EACH AREA(GRAD), MAKE AN OBJECT & STORE IT IN organizedFacultyList[]
	let organizedFacultyList: OrganizedFacultyList[] = [];
	facultyAreas.forEach(facultyArea => {
		const facultiesInArea: string[] = [];
		faculties.forEach((faculty: Faculty) => {
			if (faculty.grad === facultyArea) {
				facultiesInArea.push(faculty.ime);
			}
		});
		organizedFacultyList.push({
			facultyArea_org: facultyArea,
			facultiesInArea_org: facultiesInArea,
		});
		const sortedFacultyList: OrganizedFacultyList[] = organizedFacultyList.sort(
			(firstObj: OrganizedFacultyList, secondObj: OrganizedFacultyList) => {
				if (
					firstObj.facultiesInArea_org.length >
					secondObj.facultiesInArea_org.length
				) {
					return -1;
				} else return 1;
			}
		);
		organizedFacultyList = sortedFacultyList;
	});

	//DISPLAY AREA AND LIST OF FACULTIES IN AREA, IN A SEPERATE <div>
	const facultyListJSX = organizedFacultyList.map(
		(obj: OrganizedFacultyList, index: number) => {
			const facultiesForArea = obj.facultiesInArea_org.map(
				(faculty: string, FacIndex: number) => {
					return <p key={FacIndex}>{faculty}</p>;
				}
			);
			return (
				<div key={index}>
					<h3>{obj.facultyArea_org}</h3>
					{facultiesForArea}
				</div>
			);
		}
	);

	return (
		<div className='faculty-list-container'>
			<h1>Fakulteti</h1>
			{facultyListJSX}
		</div>
	);
};
