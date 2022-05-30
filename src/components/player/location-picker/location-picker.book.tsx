import { Fragment } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { books } from '../../../resources/@books';
import { Selection } from './_.props';

interface BookPickerProps {
	setState: (value: Selection) => void;
}

export const BookPicker = (props: BookPickerProps) => {
	const onClick = (slug: string) => {
		return () => {
			books.forEach(book => {
				if (book.slug === slug) {
					const newState = { screen: 'chapter', book } as Selection;
					props.setState(newState);
				}
			});
		};
	};
	
	return <Fragment>
		<Typography variant="h6" component="div">Cựu Ước</Typography>
		
		<Grid container columns={10}>
			{books.slice(0, 39).map(book =>
				<Grid key={book.slug} item xs={1}>
					<Button onClick={onClick(book.slug)} style={{justifyContent: "flex-start"}}>
						{book.slug.toUpperCase()}
					</Button>
				</Grid>,
			)}
		</Grid>
		
		<Typography variant="h6">Tân Ước</Typography>
		<Grid container columns={10}>
			{books.slice(39, 66).map(book =>
				<Grid key={book.slug} item xs={1}>
					<Button onClick={onClick(book.slug)} style={{justifyContent: "flex-start"}}>
						{book.slug.toUpperCase()}
					</Button>
				</Grid>,
			)}
		</Grid>
	</Fragment>;
};
