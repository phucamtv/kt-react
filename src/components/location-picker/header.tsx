import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Selection } from './_.props';

const labelDefault = 'Chọn sách';

export const Header = (props: { value: Selection, onClose: React.MouseEventHandler | undefined }) => {
	return <AppBar sx={{ position: 'relative' }}>
		<Toolbar>
			<IconButton edge="start" color="inherit" aria-label="close" onClick={props.onClose}>
				<CloseIcon />
			</IconButton>
			
			<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
				{labelDefault}
			</Typography>
		</Toolbar>
	</AppBar>;
};
