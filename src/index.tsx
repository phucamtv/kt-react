import React from 'react';
import ReactDOM from 'react-dom/client';
import './resources/index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WIP } from './routes/WIP';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path={'/'} element={<App />} />
				<Route path="/WIP" element={<WIP />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
