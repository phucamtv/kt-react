import { AppHeader } from './header';
import { AppControllerProps, AppControllers } from './player.controls';
import { Paper } from '@mui/material';

export interface AppMainProps extends AppControllerProps {
	address: string;
	voice: string;
}

export function AppMain(props: AppMainProps) {
	return (
		<div>
			<AppHeader voice={props.voice} address={props.address} />
			
			<Paper sx={{ maxWidth: '100%', padding: '1em' }} square>
				<AppControllers {...props} />
			</Paper>
		</div>
	);
}
