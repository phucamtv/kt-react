import { Channel } from './channel';
import { AudioState } from './audio.state';

export class Audio {
	private readonly ch: Channel;
	private readonly el: HTMLAudioElement;
	private readonly state: AudioState;
	private currentTime = 0;
	
	constructor() {
		console.log('<<< Audio >>>');
		
		this.ch = new Channel();
		this.state = { duration: 0, playing: false, url: '' };
		this.el = document.createElement('audio');
		this.setup();
	}
	
	private setState = (v: Partial<AudioState>) => this.ch.publish('change', { ...this.state, ...v });
	private setup = () => {
		this.el.addEventListener('durationchange', () => this.setState({ duration: this.el.duration }));
		this.el.addEventListener('playing', () => this.setState({ playing: true }));
		this.el.addEventListener('pause', () => this.setState({ playing: false }));
		this.el.addEventListener('timeupdate', () => {
			const newCurrentTime = Math.round(this.el.currentTime);
			
			if (this.currentTime !== newCurrentTime) {
				this.currentTime = newCurrentTime;
				this.ch.publish('change-current-time', this.currentTime);
			}
		});
	};
	
	getElement = () => this.el;
	getState = () => this.state;
	url = () => this.state.url;
	play = () => this.el.play();
	isPlaying = () => !this.el.paused;
	pause = () => this.el.pause();
	getCurrentTime = () => this.currentTime;
	onChange = (callback: (v: AudioState) => void) => this.ch.subscribe('change', callback);
	onChangeCurrentTime = (callback: (v: number) => void) => this.ch.subscribe('change-current-time', callback);
	
	seek(seconds: number) {
		this.el.currentTime = seconds;
		this.currentTime = seconds;
		this.ch.publish('change-current-time', this.currentTime);
	}
	
	setUrl(url: string) {
		this.el.setAttribute('src', url);
		this.setState({ url, playing: false });
	}
	
	onEnded(callback: () => void) {
		this.el.addEventListener('ended', callback);
		
		return () => this.el.removeEventListener('ended', callback);
	}
}
