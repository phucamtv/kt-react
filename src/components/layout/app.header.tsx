import logo from '../../resources/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>🏠 Home</p>
			
			<Link to="/WIP">WIP</Link>
		</header>
	);
}
