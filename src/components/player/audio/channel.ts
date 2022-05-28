type Listener = (value: any) => void;

type Topics = {
	[name: string]: Listener[];
};

export class Channel {
	private topics: Topics = {};
	private destroyed = false;
	
	getTopic(name: string) {
		if (!this.topics[name]) {
			this.topics[name] = [];
		}
		
		return this.topics[name];
	}
	
	subscribe(topic: string, fn: Listener) {
		const listeners = this.getTopic(topic);
		
		listeners.push(fn);
		
		const unsubscribe = () => {
			const index = listeners.indexOf(fn);
			
			listeners.splice(index, 1);
		};
		
		return unsubscribe;
	}
	
	publish(topic: string, value: any) {
		const listeners = this.getTopic(topic);
		const currentListeners = listeners.slice();
		
		currentListeners.forEach((listener) => {
			if (!this.destroyed) {
				listener(value);
			}
		});
	}
	
	destroy() {
		this.topics = {};
		this.destroyed = true;
	}
}
