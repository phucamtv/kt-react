import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Grid, IconButton } from '@mui/material';

export const PlayerButton = (props: { paused: boolean }) => {
	return <div>
		<Grid container spacing={0.5} justifyContent="center">
			<Grid item xs={4}>
				<IconButton>
					<SkipPreviousIcon fontSize="large" color="primary" />
				</IconButton>
			</Grid>
			
			<Grid item xs={4}>
				<IconButton
					onClick={() => {
						const url = 'https://stream.biblegateway.com/bibles/32/nkjv-bubb/John.1.adcb7d6af78e2e81fb68b3b27a9f3509.mp3';
						
						alert(111);
					}}
				>
					<PlayArrowIcon fontSize="large" color="primary" />
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
