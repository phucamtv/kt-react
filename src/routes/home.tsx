import { AppMain, AppMainProps, AppState, Location } from '../components/player/app';
import { books } from '../resources/@books';
import { Fragment } from 'react';

export function HOME() {
	const props = {
		// location: 'TODO',
		// voice: 'TODO',
		// speed: 1,
		// paused: false,
		// timer: null,
		// loop: null,
		state: new AppState({
			book: books[18],
			chapter: 23
		} as Location),
		voice: 'TODO',
	} as AppMainProps;
	
	return <Fragment>
		<AppMain {...props} />
	</Fragment>;
}
