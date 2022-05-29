type Listener = (value: any) => void;

export class Channel {
	private topics: { [name: string]: Listener[] } = {};
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
		
		return () => listeners.splice(listeners.indexOf(fn), 1);
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
