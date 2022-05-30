import { Fragment } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton } from '@mui/material';
import { AppState } from './app';

export function ButtonPrev(props: { state: AppState }) {
	const onClick = () => {
		const state = props.state.get();
		
		if (!state) {
		} else if (state.chapter > 1) {
			state.chapter -= 1;
			props.state.set(state);
		}
	};
	
	return <Fragment>
		<IconButton onClick={onClick}>
			<SkipPreviousIcon fontSize="large" color="primary" />
		</IconButton>
	</Fragment>;
}
