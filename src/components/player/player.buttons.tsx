import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Grid, IconButton } from '@mui/material';
import { Audio } from './audio/audio';
import { useState } from 'react';

const url = 'https://stream.biblegateway.com/bibles/32/nkjv-bubb/John.1.adcb7d6af78e2e81fb68b3b27a9f3509.mp3';
const audio = new Audio();
audio.setUrl(url);

export const PlayerButton = (props: { paused: boolean }) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const iconPlay = <PlayArrowIcon fontSize="large" color="primary" />;
	const iconPause = <PauseIcon fontSize="large" color="primary" />;
	
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
