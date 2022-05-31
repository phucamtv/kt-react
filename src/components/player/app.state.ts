import { Channel } from './audio/channel';
import { Location } from './app';

export class AppState {
	private readonly ch: Channel;
	private state?: Location;
	
	// voice: 'TODO',
	// speed: 1,
	// paused: false,
	// timer: null,
	// loop: null,
	
	constructor(state?: Location) {
		this.ch = new Channel();
		this.state = state;
	}
	
	onLocationChange = (callback: (v?: Location) => void) => this.ch.subscribe('location', callback);
	get = () => this.state;
	
	async set(state?: Location) {
		if (state) {
			state.url = await Location.url(state) || null;
		}
		
		this.state = state;
		this.ch.publish('location', this.state);
	}
}
