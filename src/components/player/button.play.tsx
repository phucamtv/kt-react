import { Fragment, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { AppState, Location } from './app';
import { Audio } from './audio/audio';

class Controller {
	private currentUrl?: string;
	
	constructor(
		private readonly audio: Audio,
		private readonly setState: (state: { isPlaying: boolean, isDownloading: boolean }) => void,
	) {
	}
	
	private setUrl(url: string) {
		this.audio.setUrl(url);
		this.currentUrl = url;
	}
	
	async parseUrl(location: Location): Promise<null | string> {
		const voice = 'VI1934';
		const chapter = location.chapter > 9 ? location.chapter.toString() : '0' + location.chapter.toString();
		const url = ['/resources', voice, location.book.position, chapter + '.json'].join('/');
		const data = await fetch(url).then(response => response.json());
		const audioUrl = data?.Audio[0] || '';
		
		if (audioUrl) {
			const mp3Url = 'https://kinhthanh.httlvn.org/' + audioUrl.replaceAll('\\', '/');
			
			return (this.currentUrl !== mp3Url) ? mp3Url : null;
		}
		
		return null;
	}
	
	async play(location: Location) {
		const audioUrl = await this.parseUrl(location);
		
		if (audioUrl) {
			this.setUrl(audioUrl);
		}
		
		// For development
		// this.audio.getElement().playbackRate = 4.0;
		
		await this.audio.play();
	}
	
	onClick = async (location?: Location) => {
		if (this.audio.isPlaying()) {
			this.audio.pause();
			this.setState({ isDownloading: false, isPlaying: false });
		} else {
			await this.onLocationChange(location);
		}
	};
	
	onEnded() {
		this.setState({ isDownloading: false, isPlaying: false });
	}
	
	onLocationChange = async (location?: Location, play = true) => {
		if (!location) {
			this.audio.pause();
			this.setState({ isDownloading: false, isPlaying: false });
		} else {
			this.setState({ isDownloading: true, isPlaying: false });
			await this.play(location!)
				.then(() => 'OK')
				.catch(err => {
				});
			
			this.setState({ isDownloading: false, isPlaying: true });
		}
	};
}

export interface ButtonPlayProps {
	state: AppState;
	audio: Audio;
}

export function ButtonPlay(props: ButtonPlayProps) {
	const [state, setState] = useState({ isPlaying: false, isDownloading: false });
	const iconPlay = <PlayArrowIcon fontSize="large" color={state.isDownloading ? 'inherit' : 'primary'} />;
	const iconPause = <PauseIcon fontSize="large" color="primary" />;
	const iconDownload = <DownloadingIcon fontSize="large" color="primary" />;
	
	const ctl: Controller = new Controller(props.audio, setState);
	const appState = props.state.get();
	
	useEffect(
		() => {
			const cancel_1 = props.state.onLocationChange(ctl.onLocationChange);
			const cancel_2 = props.audio.onEnded(() => ctl.onEnded());
			
			return () => {
				cancel_1();
				cancel_2();
			};
		},
	);
	
	return <Fragment>
		<IconButton onClick={() => ctl.onClick(appState)} disabled={state.isDownloading}>
			{
				state.isPlaying
					? iconPause
					: (state.isDownloading ? iconDownload : iconPlay)
			}
		</IconButton>
	</Fragment>;
}
