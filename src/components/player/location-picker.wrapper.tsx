import { AppBar, Button, Dialog, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { BookPicker } from './location-picker.book';
import { ChapterPicker } from './location-picker.chapter';
import { Book } from './@books';
import BookIcon from '@mui/icons-material/Book';

export interface LocationPickerProps {
	address: string;
}

export interface LocationPickingValue {
	screen: null | 'book' | 'chapter';
	book: null | Book,
	chapter: null | number,
}

const labelDefault = 'Chọn sách';

const Header = (props: { value: LocationPickingValue, onClose: React.MouseEventHandler | undefined }) => {
	return <AppBar sx={{ position: 'relative' }}>
		<Toolbar>
			<IconButton
				edge="start"
				color="inherit"
				aria-label="close"
				onClick={props.onClose}
			>
				<CloseIcon />
			</IconButton>
			
			<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
				{labelDefault}
			</Typography>
		</Toolbar>
	</AppBar>;
};

export const LocationPicker = (props: LocationPickerProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [state, setState] = useState<LocationPickingValue>({ screen: 'book', book: null, chapter: null });
	const onClose = () => setOpen(false);
	const labelDefault = 'Chọn sách';
	
	return <div>
		<IconButton onClick={() => {
			state.screen = 'book';
			setOpen(true);
		}} color="inherit">
			<ArrowDropDownIcon />
			{state.book?.label || labelDefault} {state.chapter || ''}
		</IconButton>
		
		<Dialog fullScreen open={open} onClose={onClose}>
			<Header onClose={onClose} value={state} />
			
			<Paper sx={{ maxWidth: '100%', padding: '1em' }} square>
				{state.screen === 'book'
					? <BookPicker setState={setState} />
					: <ChapterPicker setState={setState} setOpen={setOpen} value={state} />
				}
			</Paper>
		</Dialog>
	</div>;
};
