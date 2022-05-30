import { Grid } from '@mui/material';
import { AppState } from './app';
import { ButtonPlay } from './button.play';
import { ButtonNext } from './button.next';
import { ButtonPrev } from './button.prev';

export const PlayerButton = (props: { state: AppState }) => {
	return <div>
		<Grid container spacing={0.5} justifyContent="center">
			<Grid item xs={4}>
				<ButtonPrev {...props} />
			</Grid>
			
			<Grid item xs={4}>
				<ButtonPlay {...props} />
			</Grid>
			
			<Grid item xs={4}>
				<ButtonNext  {...props} />
			</Grid>
		</Grid>
	</div>;
};
