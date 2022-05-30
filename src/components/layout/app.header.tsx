import logo from '../../resources/logo.svg';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Button, Paper, Slider } from '@mui/material';

export function Header() {
	let player: null | ReactPlayer;
	const [state, setState] = useState({
		url: 'https://kinhthanh.httlvn.org/Audio/VI1934/thi/23.mp3',
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
		loop: true,
		seeking: false,
	});
	
	const btnPlayClick = () => setState({ ...state, playing: !state.playing });
	
	setInterval(
		function () {
			if (player) {
				const played = player.getCurrentTime();
				const duration = player.getDuration();
				
				setState({ ...state, played, duration });
			}
		},
		333,
	);
	
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			
			<div>
				<Button onClick={btnPlayClick}>{state.playing ? '⏸ PAUSE' : '▶️ PLAY'}</Button>
				
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
					
					<Paper>
						<ul>
							<li>PLAYED: {state.played}</li>
						</ul>
					</Paper>
				</div>
				
				<ReactPlayer
					ref={(v) => player = v}
					url={state.url} loop={state.loop} playsinline={true} playing={state.playing} config={{
					file: { forceAudio: true },
				}} />
			</div>
		</header>
	);
}
