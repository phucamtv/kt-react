import { AppState } from './app.state';
import { ButtonPlay } from './button.play';
import { ButtonNext } from './button.next';
import { ButtonPrev } from './button.prev';
import { AppBar, Box, Container, Paper, Toolbar } from '@mui/material';
import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

const StyledFab = styled(Fab)({ position: 'absolute', zIndex: 1, top: -15, left: 0, right: 0, margin: '0 auto' });
const StyledSlider = styled(Container)({
	position: 'absolute',
	bottom: -15,
	left: 0,
	margin: '0 auto',
	width: '100%',
});

export const PlayerContent = (props: { state: AppState }) => {
	const [playButton, seeker, content] = ButtonPlay(props);
	
	return <Fragment>
		<Paper style={{ padding: '20px' }}>{content}</Paper>
		
		<AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
			<StyledSlider>{seeker}</StyledSlider>
			
			<Toolbar>
				<ButtonPrev {...props} />
				<Box sx={{ flexGrow: 1 }} />
				<ButtonNext  {...props} />
				<StyledFab color="inherit">{playButton}</StyledFab>
			</Toolbar>
		</AppBar>
	</Fragment>;
};
