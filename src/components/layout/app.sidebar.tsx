import React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

type Anchor = 'left';

function toggleDrawer(anchor: Anchor, open: boolean, state: any, setState: any) {
	return (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||  (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		
		setState({ ...state, [anchor]: open });
	};
}

export function AppSidebar() {
	const [state, setState] = React.useState({ left: true });
	const anchor: Anchor = 'left';
	
	return (
		<div>
			<React.Fragment key={anchor}>
				<Button onClick={toggleDrawer(anchor, true, state, setState)}>{anchor}</Button>
				
				<SwipeableDrawer
					anchor={anchor}
					open={state[anchor]}
					onClose={toggleDrawer(anchor, false, state, setState)}
					onOpen={toggleDrawer(anchor, true, state, setState)}
				>
					<Box
						sx={{ width: 250 }}
						role="presentation"
						onClick={toggleDrawer(anchor, false, state, setState)}
						onKeyDown={toggleDrawer(anchor, false, state, setState)}
					>
						<List>
							<ListItem key="toc">
								<ListItemIcon><InboxIcon /></ListItemIcon>
								<ListItemText primary="Mục lục" />
							</ListItem>
							
							<ListItem key="fav">
								<ListItemIcon><InboxIcon /></ListItemIcon>
								<ListItemText primary="Yêu thích" />
							</ListItem>
						</List>
					</Box>
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}
