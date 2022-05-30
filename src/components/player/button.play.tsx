import React, { Fragment, useEffect, useState } from 'react';
import { Button, IconButton, Slider } from '@mui/material';
import { AppState, Location } from './app';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export interface ButtonPlayProps {
	state: AppState;
}

interface AudioState {
	url: string,
	pip: boolean,
	playing: boolean,
	controls: boolean,
	light: boolean,
	volume: number,
	muted: boolean,
	played: number,
	loaded: number,
	duration: number,
	playbackRate: number,
	loop: boolean,
	seeking: boolean,
	downloading: boolean,
	counter: number,
}

export function ButtonPlay(props: ButtonPlayProps) {
	let player: null | ReactPlayer = null;
	const [state, setState] = useState({
		url: '',
		pip: false,
		playing: false,
		controls: false,
		light: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false,
		seeking: false,
		counter: 0,
	});
	
	const onToggle = async () => {
		if (!state.url) {
			const location = props.state.get();
			
			if (location) {
				const url = await Location.url(location) || '';
				setState({ ...state, url, playing: !state.playing });
				
				return;
			}
		}
		
		setState({ ...state, playing: !state.playing });
	};
	
	const onAppState = async (location?: Location) => {
		if (!location) {
			setState({ ...state, playing: false });
		} else if (location) {
			setState({ ...state, url: await Location.url(location) || '' });
		}
	};
	
	const onChangeCommitted = (event: React.SyntheticEvent | Event, played: number | number[]) => {
		if (typeof played === 'number') {
			setState({ ...state, playing: true, played });
		}
	};
	
	useEffect(
		() => {
			const cancel = props.state.onLocationChange(onAppState);
			const interval = setInterval(
				function () {
					if (player) {
						const played = player.getCurrentTime();
						const duration = player.getDuration();
						
						setState({ ...state, played, duration });
					}
				},
				100,
			);
			
			return () => {
				cancel();
				clearInterval(interval);
			};
		},
	);
	
	const iconPlay = <PlayArrowIcon fontSize="large" color="primary" />;
	const iconPause = <PauseIcon fontSize="large" color="primary" />;
	
	return <Fragment>
		<IconButton onClick={onToggle}>{state.playing ? iconPause : iconPlay}</IconButton>
		
		<div>
			<Slider
				max={state.duration}
				value={state.played}
				aria-label="Seeker"
				onChangeCommitted={(e, played) => {
					if (typeof played === 'number') {
						player!.seekTo(played);
						setState({ ...state, played });
					}
				}}
			/>
		</div>
		
		<ul>
			<li>Counter: {state.counter}</li>
			<li>URL: <a href={state.url}>{state.url}</a></li>
			<li>Playing: {state.playing ? 'yes' : 'no'}</li>
			<li>Played: {state.played}</li>
			<li>Duration: {state.duration}</li>
			
			<ReactPlayer
				ref={(v) => player = v}
				url={state.url}
				loop={state.loop}
				playsinline={true}
				playing={state.playing}
				playbackRate={state.playbackRate}
				onEnded={() => setState({ ...state, playing: false })}
				onReady={() => setState({ ...state, duration: player!.getDuration() })}
				config={{ file: { forceAudio: true } }} />
		</ul>
	</Fragment>;
}
