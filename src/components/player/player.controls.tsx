import { SpeedPicker, SpeedValue } from './player.speed-picker';
import { LoopPicker, LoopValue } from './player.loop-picker';
import { TimerPicker } from './player.timer-picker';
import { PlayerButton } from './player.buttons';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { AppState } from './app';

export interface AppControllerProps {
	state: AppState,
	speed: SpeedValue;
	loop: null | LoopValue;
	timer: null | number;
}

export function AppControllers(props: AppControllerProps) {
	const [speed, setSpeed] = useState<SpeedValue>(props.speed);
	const [loop, setLoop] = useState<LoopValue>(props.loop);
	const [timer, setTimer] = useState<null | number>(props.timer);
	
	return (
		<div>
			<Grid container spacing={0.5}>
				<Grid item xs={4}>
					<SpeedPicker value={speed} setValue={setSpeed} />
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
