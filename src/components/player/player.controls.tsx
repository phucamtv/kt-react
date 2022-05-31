import { SpeedPicker, SpeedValue } from './button.speed';
import { LoopPicker, LoopValue } from './player.loop-picker';
import { TimerPicker } from './player.timer-picker';
import { PlayerContent } from './player.content';
import { Toolbar } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { AppState } from './app.state';

export interface PlayerControllersProps {
	state: AppState,
	speed: SpeedValue;
	loop: null | LoopValue;
	timer: null | number;
}

export function PlayerControllers(props: PlayerControllersProps) {
	const [loop, setLoop] = useState<LoopValue>(props.loop);
	const [timer, setTimer] = useState<null | number>(props.timer);
	
	return (
		<Fragment>
			<Toolbar>
				<SpeedPicker state={props.state} />
				<LoopPicker value={loop} setValue={setLoop} />
				<TimerPicker value={timer} setValue={setTimer} />
			</Toolbar>
			
			<PlayerContent state={props.state} />
		</Fragment>
	);
}
