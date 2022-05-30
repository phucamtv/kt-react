import { Fragment } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { IconButton } from '@mui/material';

export function ButtonPrev () {
	return <Fragment>
		<IconButton>
			<SkipPreviousIcon fontSize="large" color="primary" />
		</IconButton>
	</Fragment>
}
