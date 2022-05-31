import { Fragment } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton } from '@mui/material';
import { AppState } from './app.state';

export function ButtonPrev(props: { state: AppState }) {
	const onClick = async () => {
		const state = props.state.get();
		
		if (state && state.chapter > 1) {
			state.chapter -= 1;
			await props.state.set(state);
		}
	};
	
	return <Fragment>
		<IconButton onClick={onClick}>
			<SkipPreviousIcon fontSize="large" color="primary" />
		</IconButton>
	</Fragment>;
}
