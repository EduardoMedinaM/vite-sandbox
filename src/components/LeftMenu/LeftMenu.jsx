import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';

const LeftMenu = ({ open, onClose }) => {
	return (
		<Drawer anchor="left" open={open} onClose={onClose} aria-label="leftMenu">
			<List>
				<ListItem>
					<ListItemButton>
						<ListItemText primary="Dictionary" />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
};

LeftMenu.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
};

export default LeftMenu;
