import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import TimerIcon from '@mui/icons-material/Timer';

export interface TimerPickerProps {
	value: null | number;
	setValue: (value: null | number) => void;
}

const options = [
	{ value: 5, label: '5 minutes' },
	{ value: 10, label: '10 minutes' },
	{ value: 15, label: '15 minutes' },
	{ value: 30, label: '30 minutes' },
	{ value: 60, label: '1 hour' },
	{ value: 120, label: '2 hours' },
];

export const TimerPicker = (props: TimerPickerProps) => {
	const nilState = 'None';
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const onCloseDialog = () => setAnchorEl(null);
	const onToggleDialog = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const onSelect = (minutes: null | number) => {
		return () => {
			setAnchorEl(null);
			props.setValue(minutes);
		};
	};
	
	return <div>
		<IconButton onClick={onToggleDialog}>
			<TimerIcon /> {props.value}
		</IconButton>
		
		<Menu anchorEl={anchorEl} open={open} onClose={onCloseDialog}>
			{options.map(option =>
				<MenuItem key={option.value} onClick={onSelect(option.value)}>{option.label}</MenuItem>,
			)}
			
			<Divider />
			<MenuItem key={null} onClick={onSelect(null)}>{nilState}</MenuItem>
		</Menu>
	</div>;
};
