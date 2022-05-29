import { Book } from '../../../resources/@books';
import { AppState } from '../app';

export interface LocationPickerProps {
	state: AppState;
}

export interface Selection {
	screen: null | 'book' | 'chapter';
	book: null | Book,
	chapter: null | number,
}
