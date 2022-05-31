import { SpeedPicker, SpeedValue } from './button.speed';
import { LoopPicker, LoopValue } from './player.loop-picker';
import { TimerPicker } from './player.timer-picker';
import { PlayerButton } from './player.buttons';
import { Grid } from '@mui/material';
import { useState } from 'react';
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
		<div>
			<Grid container spacing={0.5}>
				<Grid item xs={4}>
					<SpeedPicker state={props.state} />
				</Grid>
				
				<Grid item xs={4}>
					<LoopPicker value={loop} setValue={setLoop} />
				</Grid>
				
				<Grid item xs={4}>
					<TimerPicker value={timer} setValue={setTimer} />
				</Grid>
			</Grid>
			
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={12}>
					<PlayerButton state={props.state} />
				</Grid>
			</Grid>
		</div>
	);
}
