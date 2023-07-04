import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

const NavigationBar = ({ name, onMenuClicked }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={onMenuClicked}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{name}
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

NavigationBar.propTypes = {
	name: PropTypes.string.isRequired,
	onMenuClicked: PropTypes.func.isRequired,
};

NavigationBar.defaultProps = {
	name: '',
	onMenuClicked: () => {},
};

export default NavigationBar;
