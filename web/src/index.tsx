import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers';
import { User } from './reducers/user';
import axios from 'axios';

export const store = createStore(allReducers);

const baseURL: string | undefined =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_PROD_URL
		: process.env.REACT_APP_DEV_URL;
axios.defaults.baseURL = baseURL;

//Main state type
export interface State {
	userState: User;
}

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
