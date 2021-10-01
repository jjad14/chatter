import React, { useState, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

import InboxIcon from '@material-ui/icons/Inbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import api from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';

const drawerWidth = 240;

const useStyles = makeStyles({
	appbar: {
		width: `calc(100% - ${drawerWidth}px)`
	},
	appbarNoDrawer: {
		width: '100%'
	},
	title: {
		fontWeight: 'bold'
	},
	header: {
		flexGrow: 1
	},
	links: {
		display: 'flex',
		justifyContent: 'flex-end',
		flexGrow: 1
	},
	link: {
		padding: 5,
		textTransform: 'none'
	}
});

const NavBar = () => {
	const classes = useStyles();
	const history = useHistory();

	const { user, setUser } = useContext(UserContext);

	const [anchorEl, setAnchorEl] = useState(false);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(false);
	};

	const handleLogout = () => {
		api.delete('/user/logout')
			.then(() => {
				// remove user from context
				setUser(null);
				// redirect user to home page
				history.push('/');

				//TODO: delete token or reset it

				setAnchorEl(false);
			})
			.catch((err) => {
				// console.log(err);
			});
	};

	return (
		<AppBar
			className={user ? classes.appbar : classes.appbarNoDrawer}
			elevation={1}
			color='primary'>
			<Toolbar>
				<Box component='div' className={classes.header}>
					{!user && (
						<Typography variant='h5'>
							<Link
								className={classes.title}
								component={RouterLink}
								to='/'
								underline='none'
								color='inherit'>
								Chatter
							</Link>
						</Typography>
					)}
				</Box>

				<Typography className={classes.links}>
					{user ? (
						<>
							<IconButton
								className={classes.dropdown}
								onClick={handleMenu}
								size='small'
								color='inherit'>
								<span>{user.userName}</span>&nbsp;
								<Avatar
									alt={user.userName}
									src={user.image}
									variant='circular'
								/>
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={open}
								onClose={handleClose}>
								<MenuItem
									onClick={handleClose}
									component={RouterLink}
									to='/profile'
									color='inherit'>
									<AccountCircleIcon /> Profile
								</MenuItem>
								<MenuItem
									onClick={handleClose}
									component={RouterLink}
									to='/profile'
									color='inherit'>
									<InboxIcon /> Inbox
								</MenuItem>
								<MenuItem
									onClick={handleLogout}
									component='button'>
									<ExitToAppIcon /> Logout
								</MenuItem>
							</Menu>
						</>
					) : (
						<>
							<Link
								className={classes.link}
								component={RouterLink}
								to='/login'
								color='inherit'>
								Login
							</Link>
							<Link
								className={classes.link}
								component={RouterLink}
								to='/register'
								color='inherit'>
								Register
							</Link>
						</>
					)}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
