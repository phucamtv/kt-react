import { AppHeader } from './header';
import { PlayerControllers, PlayerControllersProps } from './player.controls';
import { Book } from '../../resources/@books';
import { AppState } from './app.state';
import { Fragment } from 'react';

export class Address {
	constructor(
		public book: Book,
		public chapter: number,
		public url: null | string = null,
		public text: null | string = '',
	) {
	}
	
	static async info(location: Address): Promise<null | { url: string, text: string }> {
		const voice = 'VI1934';
		const chapter = location.chapter > 9 ? location.chapter.toString() : '0' + location.chapter.toString();
		const url = ['/resources', voice, location.book.position, chapter + '.json'].join('/');
		const data = await fetch(url).then(response => response.json());
		const audioUrl = data?.Audio[0] || '';
		const text = data?.Content || '';
		
		if (audioUrl) {
			return {
				url: 'https://kinhthanh.httlvn.org/' + audioUrl.replaceAll('\\', '/'),
				text,
			};
		}
		
		return null;
	}
}

export interface AppMainProps extends PlayerControllersProps {
	state: AppState;
	voice: string;
}

export function AppMain(props: AppMainProps) {
	return (
		<Fragment>
			<AppHeader voice={props.voice} state={props.state} />
			
			<PlayerControllers {...props} />
		</Fragment>
	);
}
