import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import RepeatIcon from '@mui/icons-material/Repeat';

export type LoopValue = null | 'Chapter' | 'Verse';
const options: Array<LoopValue> = ['Chapter', 'Verse'];

export interface LoopPickerProps {
	value: LoopValue;
	setValue: (value: LoopValue) => void;
}

export const LoopPicker = (props: LoopPickerProps) => {
	const nilState = 'No repeat';
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const toggleDialog = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const onCloseDialog = () => setAnchorEl(null);
	const onSelect = (value: LoopValue) => {
		return () => {
			setAnchorEl(null);
			props.setValue(value);
		};
	};
	
	return <div>
		<IconButton onClick={toggleDialog} size='small'>
			<RepeatIcon /> {props.value || nilState}
		</IconButton>
		
		<Menu anchorEl={anchorEl} open={open} onClose={onCloseDialog}>
			{options.map(option =>
				<MenuItem key={option} onClick={onSelect(option)}>{option}</MenuItem>,
			)}
			<Divider />
			<MenuItem key={null} onClick={onSelect(null)}>{nilState}</MenuItem>
		</Menu>
	</div>;
};
