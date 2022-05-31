import { Fragment } from 'react';
import { QuickLocationPicker } from './quick.location-picker';
import { LocationPickerProps } from './_.props';

export const LocationPicker = (props: LocationPickerProps) => {
	return <Fragment>
		<QuickLocationPicker {...props} />
	</Fragment>;
};
