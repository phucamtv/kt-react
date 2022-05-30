import { AppMain, AppMainProps, AppState } from '../components/player/app';

export function WIP() {
	const props = {
		// location: 'TODO',
		// voice: 'TODO',
		// speed: 1,
		// paused: false,
		// timer: null,
		// loop: null,
		state: new AppState(),
		voice: 'TODO',
	} as AppMainProps;
	
	return AppMain(props);
}
