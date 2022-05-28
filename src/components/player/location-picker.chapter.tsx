import { Fragment } from 'react';
import { LocationPickingValue } from './location-picker.wrapper';
import { Button, Grid, Typography } from '@mui/material';

interface ChapterPickerProps {
	value: LocationPickingValue;
	setState: (value: LocationPickingValue) => void;
	setOpen: (value: boolean) => void;
}

export const ChapterPicker = (props: ChapterPickerProps) => {
	const onClick = (chapter: number) => {
		return () => {
			props.value.chapter = chapter;
			props.setState(props.value);
			props.setOpen(false);
			props.value.screen = null;
		};
	};
	
	const chapters: Array<number> = [];
	const chapterMax = props.value.book?.chapters || 1;
	
	for (let chapter = 1; chapter <= chapterMax; chapter++) {
		chapters.push(chapter);
	}
	
	return <Fragment>
		<Typography variant="h6" component="div">{props.value.book?.label}</Typography>
		
		<Grid container columns={10}>
			{chapters.map(chapter =>
				<Grid key={chapter} item xs={1}>
					<Button onClick={onClick(chapter)}>
						{chapter}
					</Button>
				</Grid>,
			)}
		</Grid>
	</Fragment>;
};
