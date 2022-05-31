import { AppMain, AppMainProps, Address } from '../components/player/app';
import { books } from '../resources/@books';
import { Fragment, useEffect } from 'react';
import { AppState } from '../components/player/app.state';

export function HOME() {
	const appState = new AppState();
	
	useEffect(() => {
		const defaultLocation = new Address(books[18], 23);
		appState.setAddress(defaultLocation);
	}, []);
	
	const props = {
		state: appState,
		voice: 'TODO',
	} as AppMainProps;
	
	return <Fragment>
		<AppMain {...props} />
	</Fragment>;
}
