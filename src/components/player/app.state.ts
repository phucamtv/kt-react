import { Channel } from './audio/channel';
import { Address } from './app';
import { SpeedValue } from './button.speed';
import { books } from '../../resources/@books';

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
	
	async prev() {
		if (!this.address) {
			return;
		}
		
		const address = this.address;
		if (address.chapter != 1) {
			address.chapter -= 1;
		} else {
			const position = parseInt(address.book.position);
			address.book = books[position - 2] || books[65];
			address.chapter = address.book.chapters;
		}
		
		await this.setAddress(address);
	}
	
	async next() {
		if (!this.address) {
			return;
		}
		
		const address = this.address;
		if (address.chapter < address.book.chapters) {
			address.chapter += 1;
		} else {
			const position = parseInt(address.book.position);
			
			address.book = books[position] || books[0];
			address.chapter = 1;
		}
		
		await this.setAddress(address);
	}
	
	async setAddress(address?: Address) {
		if (address) {
			const info = await Address.info(address) || null;
			if (info) {
				address.url = info.url;
				address.text = info.text;
			}
		}
		
		this.address = address;
		this.ch.publish('address', this.address);
	}
}
