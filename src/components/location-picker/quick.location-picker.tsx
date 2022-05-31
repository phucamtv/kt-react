import { Dialog, IconButton, Paper } from '@mui/material';
import { useState } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { BookPicker } from './location-picker.book';
import { ChapterPicker } from './location-picker.chapter';
import { Header } from './header';
import { LocationPickerProps, Selection } from './_.props';
import { Address } from '../player/app';

export const QuickLocationPicker = (props: LocationPickerProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [selection, setSelection] = useState<Selection>({ screen: 'book', book: null, chapter: null });
	const onOpen = () => {
		selection.screen = 'book';
		setOpen(true);
	};
	const onClose = () => setOpen(false);
	
	const state = props.state.getAddress();
	const labelDefault = 'Chọn sách';
	const [label, setLabel] = useState(!state ? labelDefault : (state.book.label + ' ' + state.chapter));
	
	props.state.onAddress(selection => {
		if (selection) {
			setLabel(selection.book.label + ' ' + selection.chapter);
		} else {
			setLabel(labelDefault);
		}
	});
	
	return <div>
		<IconButton onClick={onOpen} color="inherit">
			<BookIcon /> {label}
		</IconButton>
		
		<Dialog fullScreen open={open} onClose={onClose}>
			<Header onClose={onClose} value={selection} />
			
			<Paper sx={{ maxWidth: '100%', padding: '1em' }} square>
				{
					selection.screen === 'book'
						? <BookPicker setState={setSelection} />
						: <ChapterPicker
							state={selection}
							setSelection={
								async (selection: Selection, close: boolean): Promise<void> => {
									selection.screen = null;
									setSelection(selection);
									if (close) {
										setOpen(false);
									}
									
									const location = { book: selection.book!, chapter: selection.chapter! } as Address;
									
									await props.state.setAddress(location);
								}
							} />
				}
			</Paper>
		</Dialog>
	</div>;
};
