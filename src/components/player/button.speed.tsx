import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { AppState } from './app.state';

export type SpeedValue = 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;
const options: Array<SpeedValue> = [0.75, 1, 1.25, 1.5, 1.75, 2];

type SpeedPickerProps = {
	state: AppState
};

export const SpeedPicker = (props: SpeedPickerProps) => {
	const [speed, setSpeed] = useState(props.state.getSpeed());
	props.state.onSpeed((v) => setSpeed(v));
	
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const onCloseDialog = () => setAnchorEl(null);
	const onToggleDialog = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const onSelect = (value: SpeedValue) => {
		return () => {
			setAnchorEl(null);
			
			props.state.setSpeed(value);
		};
	};
	
	return <div>
		<IconButton onClick={onToggleDialog}>
			<SlowMotionVideoIcon />
			{speed}x
		</IconButton>
		
		<Menu anchorEl={anchorEl} open={open} onClose={onCloseDialog}>
			{options.map(option =>
				<MenuItem key={option} onClick={onSelect(option)}>{option}x</MenuItem>,
			)}
		</Menu>
	</div>;
};
