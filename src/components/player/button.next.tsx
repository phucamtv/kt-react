import { Fragment } from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconButton } from '@mui/material';
import { AppState } from './app';

export function ButtonNext(props: { state: AppState }) {
	const onClick = () => {
		const state = props.state.get();
		
		if (!state) {
		} else if (state.chapter < state.book.chapters) {
			state.chapter += 1;
			props.state.set(state);
		}
	};
	
	return <Fragment>
		<IconButton onClick={onClick}>
			<SkipNextIcon fontSize="large" color="primary" />
		</IconButton>
	</Fragment>;
}
