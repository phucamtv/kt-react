import { Fragment } from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconButton } from '@mui/material';
import { AppState } from '../app.state';

export function ButtonNext(props: { state: AppState }) {
	const onClick = () => {
		const state = props.state.getAddress();
		
		if (!state) {
		} else if (state.chapter < state.book.chapters) {
			state.chapter += 1;
			props.state.setAddress(state);
		}
	};
	
	return <Fragment>
		<IconButton onClick={onClick}>
			<SkipNextIcon fontSize="small" color="primary" />
		</IconButton>
	</Fragment>;
}