import { AppBar, Toolbar, Typography } from '@mui/material';
import { AppState } from './app.state';
import { LocationPicker } from '../location-picker/location-picker.wrapper';

interface AppHeaderProps {
	state: AppState;
	voice: string;
}

export const AppHeader = (props: AppHeaderProps) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography component="div" sx={{ flexGrow: 1 }}>
					<LocationPicker state={props.state} />
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
