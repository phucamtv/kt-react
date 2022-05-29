import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Grid, IconButton } from '@mui/material';
import { Audio } from './audio/audio';
import { useState } from 'react';
import { AppState, Location } from './app';

const url = 'https://stream.biblegateway.com/bibles/32/nkjv-bubb/John.1.adcb7d6af78e2e81fb68b3b27a9f3509.mp3';
const audio = new Audio();
audio.setUrl(url);

export interface PlayerButtonProps {
	state: AppState;
	paused: boolean;
}

export const PlayerButton = (props: PlayerButtonProps) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const iconPlay = <PlayArrowIcon fontSize="large" color="primary" />;
	const iconPause = <PauseIcon fontSize="large" color="primary" />;
	
	props.state.onLocationChange(async (location?: Location) => {
		if (!location) {
			audio.pause();
		} else {
			const voice = 'VI1934';
			const chapter = location.chapter > 9 ? location.chapter.toString() : '0' + location.chapter.toString();
			const url = ['/resources', voice, location.book.position, chapter + '.json'].join('/');
			const data = await fetch(url).then(response => response.json());
			const audioUrl = data?.Audio[0] || '';
			
			if (audioUrl) {
				const mp3Url = 'https://kinhthanh.httlvn.org/' + audioUrl.replaceAll('\\', '/');
				
				if (audio.url() !== mp3Url) {
					audio.setUrl(mp3Url);
					await audio.play();
				}
			}
		}
	});
	
	return <div>
		<Grid container spacing={0.5} justifyContent="center">
			<Grid item xs={4}>
				<IconButton>
					<SkipPreviousIcon fontSize="large" color="primary" />
				</IconButton>
			</Grid>
			
			<Grid item xs={4}>
				<IconButton
					onClick={async () => {
						if (audio.isPlaying()) {
							setIsPlaying(false);
							audio.pause();
						} else {
							await audio.play();
							setIsPlaying(true);
						}
					}}
				>
					{isPlaying ? iconPause : iconPlay}
				</IconButton>
			</Grid>
			
			<Grid item xs={4}>
				<IconButton>
					<SkipNextIcon fontSize="large" color="primary" />
				</IconButton>
			</Grid>
		</Grid>
	</div>;
};
