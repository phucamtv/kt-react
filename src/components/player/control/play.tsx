import React, { Fragment, useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, List, ListItem, Slider } from '@mui/material';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { AppState } from '../app.state';
import { AudioState, defaultAudioState } from './play.state';
import { playEffect } from './play.effect';

export interface ButtonPlayProps {
	state: AppState;
}

export function ButtonPlay(props: ButtonPlayProps) {
	let player: null | ReactPlayer = null;
	const [state, setState] = useState<AudioState>(defaultAudioState);
	
	useEffect(
		() => playEffect(player, props.state, setState),
		[state],
	);
	
	return [
		<Fragment>
			{
				state.playing
					? <PauseIcon fontSize="large" color="primary" onClick={() => setState({ ...state, playing: false })} />
					: <PlayArrowIcon fontSize="large" color="primary" onClick={() => setState({ ...state, playing: true })} />
			}
			
			<Box sx={{ display: 'flex' }}>
				<CircularProgress
					thickness={1}
					variant="determinate"
					size={58}
					value={!state.duration ? 0 : state.played * 100 / state.duration}
					sx={{ position: 'absolute', top: -1, left: -1, zIndex: -1 }}
				/>
			</Box>
		</Fragment>,
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
			
			{!state.verbose ? '' : <List>
				<ListItem><Divider /></ListItem>
				<ListItem>URL: <a href={state.url}>{state.url}</a></ListItem>
				<ListItem>Playing: {state.playing ? 'yes' : 'no'}</ListItem>
				<ListItem>Played: {state.played}</ListItem>
				<ListItem>Duration: {state.duration}</ListItem>
				<ListItem>Rate: {state.playbackRate}</ListItem>
			</List>}
			
			{!state.url ? 'NO PLAYER' : <ReactPlayer
				ref={(v) => player = v}
				url={state.url}
				loop={state.loop}
				playsinline={true}
				playing={state.playing}
				playbackRate={state.playbackRate}
				// onEnded={() => setState({ ...state, playing: false })}
				onEnded={() => props.state.next()}
				onReady={() => setState({ ...state, duration: player!.getDuration() })}
				onError={(err) => console.log({ err })}
				config={{ file: { forceAudio: true } }} />}
		</Fragment>,
	];
}
