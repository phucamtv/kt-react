import { Fragment } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton } from '@mui/material';
import { AppState } from '../app.state';

export function ButtonPrev(props: { state: AppState }) {
	return <Fragment>
		<IconButton onClick={() => props.state.prev()}>
			<SkipPreviousIcon fontSize="small" color="primary" />
		</IconButton>
	</Fragment>;
}
