import { Dialog, IconButton, Paper } from '@mui/material';
import { useState } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { BookPicker } from './location-picker.book';
import { ChapterPicker } from './location-picker.chapter';
import { Header } from './header';
import { LocationPickerProps, Selection } from './_.props';

export const QuickLocationPicker = (props: LocationPickerProps) => {
	const labelDefault = 'Chọn sách';
	const [open, setOpen] = useState<boolean>(false);
	const [selection, setSelection] = useState<Selection>({ screen: 'book', book: null, chapter: null });
	const onOpen = () => {
		selection.screen = 'book';
		setOpen(true);
	};
	const onClose = () => setOpen(false);
	const bookPickerScreen = <BookPicker setState={setSelection} />;
	const chapterPickerScreen = <ChapterPicker
		state={selection}
		setSelection={(selection: Selection, close: boolean): void => {
			selection.screen = null;
			setSelection(selection);
			if (close) {
				setOpen(false);
			}
			
			props.state.set({
				book: selection.book!,
				chapter: selection.chapter!,
			});
		}} />;
	
	return <div>
		<IconButton onClick={onOpen} color="inherit">
			<BookIcon />
			{selection.book?.label || labelDefault} {selection.chapter || ''}
		</IconButton>
		
		<Dialog fullScreen open={open} onClose={onClose}>
			<Header onClose={onClose} value={selection} />
			
			<Paper sx={{ maxWidth: '100%', padding: '1em' }} square>
				{selection.screen === 'book' ? bookPickerScreen : chapterPickerScreen}
			</Paper>
		</Dialog>
	</div>;
};
