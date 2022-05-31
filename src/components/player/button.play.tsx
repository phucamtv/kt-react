import React, { Fragment, useEffect, useState } from 'react';
import { Card, Divider, Grid, IconButton, List, ListItem, Paper, Slider } from '@mui/material';
import { Address } from './app';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { AppState } from './app.state';


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
}

export function ButtonPlay(props: ButtonPlayProps) {
	let player: null | ReactPlayer = null;
	const [state, setState] = useState({
		url: '',
		text: '',
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
	});
	
	const onLocation = async (location?: Address) => {
		if (!location) {
			setState({ ...state, playing: false });
		} else if (location) {
			setState({ ...state, url: location.url || '', text: location.text || '' });
		}
	};
	
	useEffect(
		() => {
			const addressListener = props.state.onAddress(onLocation);
			const speedListener = props.state.onSpeed((playbackRate) => {
				setState({ ...state, playbackRate: playbackRate || 1.0 });
			});
			
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
				addressListener();
				speedListener();
				clearInterval(interval);
			};
		},
	);
	
	const iconPlay = <PlayArrowIcon fontSize="large" color="primary" />;
	const iconPause = <PauseIcon fontSize="large" color="primary" />;
	
	return [
		<IconButton
			onClick={async () => {
				if (!state.url) {
					const location = props.state.getAddress();
					
					if (location) {
						setState((state) => ({ ...state, playing: true }));
						
						return;
					}
				}
				
				setState({ ...state, playing: !state.playing });
			}}
		>{state.playing ? iconPause : iconPlay}</IconButton>,
		<Slider
			max={state.duration}
			value={state.played}
			aria-label="Seeker"
			size="small"
			onChangeCommitted={(e, played) => {
				if (typeof played === 'number') {
					player!.seekTo(played);
					setState({ ...state, played });
				}
			}}
		/>,
		<Fragment>
			<div dangerouslySetInnerHTML={{ __html: state.text }} />
			<Divider />
			
			<List>
				<ListItem>URL: <a href={state.url}>{state.url}</a></ListItem>
				<ListItem>Playing: {state.playing ? 'yes' : 'no'}</ListItem>
				<ListItem>Played: {state.played}</ListItem>
				<ListItem>Duration: {state.duration}</ListItem>
				<ListItem>Rate: {state.playbackRate}</ListItem>
			</List>
			
			
			{!state.url ? 'NO PLAYER' : <ReactPlayer
				ref={(v) => player = v}
				url={state.url}
				loop={state.loop}
				playsinline={true}
				playing={state.playing}
				playbackRate={state.playbackRate}
				onEnded={() => setState({ ...state, playing: false })}
				onReady={() => setState({ ...state, duration: player!.getDuration() })}
				onError={(err) => console.log({ err })}
				config={{ file: { forceAudio: true } }} />}
		</Fragment>,
	];
}
