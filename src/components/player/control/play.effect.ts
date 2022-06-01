import { AppState } from '../app.state';
import { Address } from '../app';
import { AudioState } from './play.state';
import { Dispatch, SetStateAction } from 'react';
import ReactPlayer from 'react-player';

export function playEffect(player: null | ReactPlayer, appState: AppState, setState: Dispatch<SetStateAction<AudioState>>) {
	const addressListener = appState.onAddress(
		async (location?: Address) => {
			if (!location) {
				setState((state) => ({ ...state, playing: false }));
			} else if (location) {
				setState((state) => ({ ...state, url: location.url || '', text: location.text || '' }));
			}
		},
	);
	
	const speedListener = appState.onSpeed((playbackRate) => {
		setState((state) => ({ ...state, playbackRate: playbackRate || 1.0 }));
	});
	
	const interval = setInterval(
		function () {
			if (player) {
				const played = player.getCurrentTime();
				const duration = player.getDuration();
				
				setState((state) => ({ ...state, played, duration }));
			}
		},
		100,
	);
	
	return () => {
		addressListener();
		speedListener();
		clearInterval(interval);
	};
}
