import React from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../src/design-tokens/_scss-variables.scss';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { FacultyPostsPage } from './pages/FacultyPostsPage/FacultyPostsPage';

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/' component={HomePage}></Route>
					<Route exact path='/registracija' component={RegisterPage}></Route>
					<Route exact path='/prijava' component={LoginPage}></Route>
					<Route
						exact
						path='/fakultet/:facultyName'
						component={FacultyPostsPage}
					></Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
