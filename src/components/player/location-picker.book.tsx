import { Fragment } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { books } from './@books';
import { LocationPickingValue } from './location-picker.wrapper';

interface BookPickerProps {
	setState: (value: LocationPickingValue) => void;
}

export const BookPicker = (props: BookPickerProps) => {
	const onClick = (slug: string) => {
		return () => {
			books.forEach(book => {
				if (book.slug === slug) {
					const newState = { screen: 'chapter', book } as LocationPickingValue;
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
					<Button onClick={onClick(book.slug)}>
						{book.slug.toUpperCase()}
					</Button>
				</Grid>,
			)}
		</Grid>
		
		<Typography variant="h6">Tân Ước</Typography>
		<Grid container columns={10}>
			{books.slice(39, 66).map(book =>
				<Grid key={book.slug} item xs={1}>
					<Button onClick={onClick(book.slug)}>
						{book.slug.toUpperCase()}
					</Button>
				</Grid>,
			)}
		</Grid>
	</Fragment>;
};
