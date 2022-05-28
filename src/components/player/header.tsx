import { VoicePicker } from './header.voice-picker';
import { LocationPicker } from './location-picker.wrapper';
import { AppBar, Toolbar, Typography } from '@mui/material';

interface AppHeaderProps {
	address: string;
	voice: string;
}

export const AppHeader = (props: AppHeaderProps) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography component="div" sx={{ flexGrow: 1 }}>
					<LocationPicker address={props.address} />
				</Typography>
				
				<VoicePicker voice={props.voice} />
			</Toolbar>
		</AppBar>
	);
};
