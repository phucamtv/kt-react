import { AppMain, AppMainProps, Location } from '../components/player/app';
import { books } from '../resources/@books';
import { Fragment, useEffect } from 'react';
import { AppState } from '../components/player/app.state';

export function HOME() {
	const appState = new AppState();
	
	useEffect(() => {
		const defaultLocation = new Location(books[18], 23);
		appState.set(defaultLocation);
	}, []);
	
	const props = {
		state: appState,
		voice: 'TODO',
	} as AppMainProps;
	
	return <Fragment>
		<AppMain {...props} />
	</Fragment>;
}
