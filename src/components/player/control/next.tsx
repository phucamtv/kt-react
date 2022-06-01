import { Fragment } from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconButton } from '@mui/material';
import { AppState } from '../app.state';

export function ButtonNext(props: { state: AppState }) {
	return <Fragment>
		<IconButton onClick={() => props.state.next()}>
			<SkipNextIcon fontSize="small" color="primary" />
		</IconButton>
	</Fragment>;
}
