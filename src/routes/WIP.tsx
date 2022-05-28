import { AppMain, AppMainProps } from '../components/player/main';

export function WIP() {
	const props = {
		address: 'TODO',
		voice: 'TODO',
		speed: 1,
		paused: false,
		timer: null,
		loop: null,
	} as AppMainProps;
	
	return AppMain(props);
}
