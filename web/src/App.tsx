import React from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../src/design-tokens/_scss-variables.scss';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/' component={HomePage}></Route>
					<Route exact path='/register' component={RegisterPage}></Route>
					{/* <Route exact path='/login' component={LoginPage}></Route> */}
				</Switch>
			</div>
		</Router>
	);
};

export default App;
