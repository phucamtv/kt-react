import { Fragment, useState } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { Audio } from './audio/audio';
import { AppState, Location } from './app';

class Controller {
	private readonly audio: Audio;
	
	constructor(
		private readonly setState: (state: { isPlaying: boolean, isDownloading: boolean }) => void,
	) {
		this.audio = new Audio();
	}
	
	destroy() {
		this.audio.getElement().srcObject = null;
	}
	
	async parseUrl(location: Location): Promise<null | string> {
		const voice = 'VI1934';
		const chapter = location.chapter > 9 ? location.chapter.toString() : '0' + location.chapter.toString();
		const url = ['/resources', voice, location.book.position, chapter + '.json'].join('/');
		const data = await fetch(url).then(response => response.json());
		const audioUrl = data?.Audio[0] || '';
		
		if (audioUrl) {
			const mp3Url = 'https://kinhthanh.httlvn.org/' + audioUrl.replaceAll('\\', '/');
			
			return (this.audio.url() !== mp3Url) ? mp3Url : null;
		}
		
		return null;
	}
	
	async play(location: Location) {
		const audioUrl = await this.parseUrl(location);
		
		if (audioUrl) {
			this.audio.setUrl(audioUrl);
		}
		
		await this.audio.play();
	}
	
	onClick = async (location?: Location) => {
		console.log({ onClick: location });
		
		if (this.audio.isPlaying()) {
			this.audio.pause();
			this.setState({ isDownloading: false, isPlaying: false });
		} else {
			await this.onLocationChange(location);
		}
	};
	
	onLocationChange = async (location?: Location, play = true) => {
		if (!location) {
			this.audio.pause();
			this.setState({ isDownloading: false, isPlaying: false });
		} else {
			this.setState({ isDownloading: true, isPlaying: false });
			await this.play(location!);
			this.setState({ isDownloading: false, isPlaying: true });
		}
	};
}

export function ButtonPlay(props: { state: AppState }) {
	const [state, setState] = useState({ isPlaying: false, isDownloading: false });
	const iconPlay = <PlayArrowIcon fontSize="large" color={state.isDownloading ? 'inherit' : 'primary'} />;
	const iconPause = <PauseIcon fontSize="large" color="primary" />;
	const iconDownload = <DownloadingIcon fontSize="large" color="primary" />;
	let ctl: Controller = new Controller(setState);
	
	const appState = props.state.get();
	
	props.state.onLocationChange(ctl.onLocationChange);
	
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
