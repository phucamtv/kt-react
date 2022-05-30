import { AppHeader } from './header';
import { AppControllerProps, AppControllers } from './player.controls';
import { Paper } from '@mui/material';
import { Book } from '../../resources/@books';
import { Channel } from './audio/channel';

export class Location {
	constructor(
		public book: Book,
		public chapter: number
	) {
	}
	
	static async url(location: Location): Promise<null | string> {
		const voice = 'VI1934';
		const chapter = location.chapter > 9 ? location.chapter.toString() : '0' + location.chapter.toString();
		const url = ['/resources', voice, location.book.position, chapter + '.json'].join('/');
		const data = await fetch(url).then(response => response.json());
		const audioUrl = data?.Audio[0] || '';
		
		if (audioUrl) {
			return 'https://kinhthanh.httlvn.org/' + audioUrl.replaceAll('\\', '/');
		}
		
		return null;
	}
}

export class AppState {
	private readonly ch: Channel;
	private state?: Location;
	
	constructor(state?: Location) {
		this.ch = new Channel();
		this.state = state;
	}
	
	onLocationChange = (callback: (v?: Location) => void) => this.ch.subscribe('location', callback);
	get = () => this.state;
	
	set(state?: Location) {
		this.state = state;
		this.ch.publish('location', this.state);
	}
}

export interface AppMainProps extends AppControllerProps {
	state: AppState;
	voice: string;
}

export function AppMain(props: AppMainProps) {
	return (
		<div>
			<AppHeader voice={props.voice} state={props.state} />
			
			<Paper sx={{ maxWidth: '100%', padding: '1em' }} square>
				<AppControllers {...props} />
			</Paper>
		</div>
	);
}
