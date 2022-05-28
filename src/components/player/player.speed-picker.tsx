import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';

export type SpeedValue = 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;
const options: Array<SpeedValue> = [0.75, 1, 1.25, 1.5, 1.75, 2];

type SpeedPickerProps = {
	value: SpeedValue,
	setValue: (value: SpeedValue) => void
};

export const SpeedPicker = (props: SpeedPickerProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const onCloseDialog = () => setAnchorEl(null);
	const onToggleDialog = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const onSelect = (value: SpeedValue) => {
		return () => {
			setAnchorEl(null);
			props.setValue(value);
		};
	};
	
	return <div>
		<IconButton onClick={onToggleDialog}>
			<SlowMotionVideoIcon />
			{props.value}x
		</IconButton>
		
		<Menu anchorEl={anchorEl} open={open} onClose={onCloseDialog}>
			{options.map(option =>
				<MenuItem key={option} onClick={onSelect(option)}>{option}x</MenuItem>,
			)}
		</Menu>
	</div>;
};
