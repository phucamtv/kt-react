import { Channel } from './audio/channel';
import { Address } from './app';
import { SpeedValue } from './button.speed';

export class AppState {
	private readonly ch: Channel;
	private address?: Address;
	private speed?: SpeedValue = 1;
	
	// voice: 'TODO',
	// paused: false,
	// timer: null,
	// loop: null,
	
	constructor(state?: Address) {
		this.ch = new Channel();
		this.address = state;
	}
	
	onSpeed = (callback: (v?: SpeedValue) => void) => this.ch.subscribe('speed', callback);
	
	getSpeed = () => this.speed;
	setSpeed(v?: SpeedValue) {
		this.speed = v;
		this.ch.publish('speed', this.speed);
	}
	
	onAddress = (callback: (v?: Address) => void) => this.ch.subscribe('address', callback);
	getAddress = () => this.address;
	
	async setAddress(address?: Address) {
		if (address) {
			address.url = await Address.url(address) || null;
		}
		
		this.address = address;
		this.ch.publish('address', this.address);
	}
}
