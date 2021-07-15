import React from 'react';
import { HomePage } from './pages/HomePage';
import '../src/design-tokens/_scss-variables.scss';

const App: React.FC = () => {
	return (
		<div>
			<HomePage />
		</div>
	);
};

export default App;
