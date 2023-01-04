import { SpeedPicker, SpeedValue } from './button.speed';
import { LoopPicker, LoopValue } from './player.loop-picker';
import { TimerPicker } from './player.timer-picker';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { AppState } from './app.state';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import { ButtonPlay } from './control/play';
import { ButtonPrev } from './control/prev';
import { ButtonNext } from './control/next';

export interface PlayerControllersProps {
	state: AppState,
	speed: SpeedValue;
	loop: null | LoopValue;
	timer: null | number;
}

const StyledPlayButton = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -15,
	left: 0,
	right: 0,
	margin: '0 auto',
});

export function PlayerControllers(props: PlayerControllersProps) {
	const [loop, setLoop] = useState<LoopValue>(props.loop);
	const [timer, setTimer] = useState<null | number>(props.timer);
	const [playButton, seeker, content] = ButtonPlay(props);
	const prevButton = <ButtonPrev state={props.state} />;
	const nextButton = <ButtonNext state={props.state} />;
	
	return <Fragment>
		<Container style={{ padding: '20px', overflow: 'hidden' }}>{content}</Container>
		
		<TimerPicker value={timer} setValue={setTimer} />
		
		<AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0 }}>
			<Toolbar>
				{prevButton}
				
				<SpeedPicker state={props.state} />
				
				<StyledPlayButton color="inherit">
					{playButton}
				</StyledPlayButton>
				
				<LoopPicker value={loop} setValue={setLoop} />
				
				<Box sx={{ flexGrow: 1 }} />
				
				{nextButton}
			</Toolbar>
		</AppBar>
	</Fragment>;
}
