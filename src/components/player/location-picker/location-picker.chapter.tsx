import { Fragment } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Selection } from './_.props';

interface ChapterPickerProps {
	state: Selection;
	setSelection: (value: Selection, close: boolean) => void;
}

export const ChapterPicker = (props: ChapterPickerProps) => {
	const onClick = (chapter: number) => {
		return () => {
			props.state.chapter = chapter;
			props.setSelection(props.state, true);
		};
	};
	
	const chapters: Array<number> = [];
	const chapterMax = props.state.book?.chapters || 1;
	
	for (let chapter = 1; chapter <= chapterMax; chapter++) {
		chapters.push(chapter);
	}
	
	return <Fragment>
		<Typography variant="h6" component="div">{props.state.book?.label}</Typography>
		
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
