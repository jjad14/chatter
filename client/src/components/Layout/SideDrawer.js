import React, { useContext } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import TheatersIcon from '@material-ui/icons/Theaters';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ComputerIcon from '@material-ui/icons/Computer';
import PublicIcon from '@material-ui/icons/Public';
import StarIcon from '@material-ui/icons/Star';
import SettingsIcon from '@material-ui/icons/Settings';

import { UserContext } from '../../contexts/UserContext';
import { CustomThemeContext } from '../../contexts/CustomThemeProvider';
import { useConversations } from '../../contexts/ConversationProvider';

// If changing, must change it also in NavBar.js
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		drawer: {
			width: drawerWidth
		},
		drawerPaper: {
			width: drawerWidth
		},
		title: {
			display: 'block',
			textAlign: 'center',
			fontWeight: 'bold',
			padding: theme.spacing(2)
		},
		list: {
			display: 'flex',
			flexDirection: 'column',
			flexGrow: 1
		},
		settings: {
			marginTop: 'auto'
		}
	};
});

// Side drawer for auth users, displays default chat rooms and settings
const SideDrawer = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	const { user } = useContext(UserContext);
	const { currentTheme } = useContext(CustomThemeContext);
	const { joinConversation } = useConversations();

	const theme = currentTheme === 'lightTheme' ? true : false;

	// TODO: Retrieve these from backend
	const menuItems = [
		{
			text: 'General',
			icon: <StarIcon color={theme ? 'primary' : 'inherit'} />,
			path: '/chat/General'
		},
		{
			text: 'Sports',
			icon: <SportsFootballIcon color={theme ? 'primary' : 'inherit'} />,
			path: '/chat/Sports'
		},
		{
			text: 'Movies',
			icon: <TheatersIcon color={theme ? 'primary' : 'inherit'} />,
			path: '/chat/Movies'
		},
		{
			text: 'Books',
			icon: <MenuBookIcon color={theme ? 'primary' : 'inherit'} />,
			path: '/chat/Books'
		},
		{
			text: 'Politics',
			icon: <PublicIcon color={theme ? 'primary' : 'inherit'} />,
			path: '/chat/Politics'
		},
		{
			text: 'Games',
			icon: <SportsEsportsIcon color={theme ? 'primary' : 'inherit'} />,
			path: '/chat/Games'
		},
		{
			text: 'Music',
			icon: <MusicNoteIcon color={theme ? 'primary' : 'inherit'} />,
			path: '/chat/Music'
		},
		{
			text: 'Technology',
			icon: <ComputerIcon color={theme ? 'primary' : 'inherit'} />,
			path: '/chat/Technology'
		}
	];

	const defaultRoomHandler = (room, path) => {
		joinConversation(room)
			.then(() => history.push(path))
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Drawer
			className={classes.drawer}
			variant='permanent'
			anchor='left'
			classes={{ paper: classes.drawerPaper }}>
			<div>
				<Typography variant='h5' className={classes.title}>
					<Link
						component={RouterLink}
						to={user ? '/home' : '/login'}
						underline='none'
						color='textPrimary'>
						Chatter
					</Link>
				</Typography>
				<Divider />
			</div>
			<List className={classes.list}>
				{menuItems.map((item) => (
					<ListItem
						key={item.text}
						button
						disabled={user === null}
						onClick={() => defaultRoomHandler(item.text, item.path)}
						className={
							location.pathname === item.path
								? classes.active
								: null
						}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}

				<Divider />
				<ListItem
					button
					onClick={() => history.push('/settings')}
					disabled={user === null}
					className={classes.settings}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary='Settings' />
				</ListItem>
			</List>
		</Drawer>
	);
};

export default SideDrawer;
