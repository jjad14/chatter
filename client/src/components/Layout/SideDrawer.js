import React from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import Divider from "@material-ui/core/Divider";

import SportsFootballIcon from "@material-ui/icons/SportsFootball";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import TheatersIcon from "@material-ui/icons/Theaters";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import ComputerIcon from "@material-ui/icons/Computer";
import PublicIcon from "@material-ui/icons/Public";
import StarIcon from "@material-ui/icons/Star";
import SettingsIcon from "@material-ui/icons/Settings";

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
			display: "block",
			textAlign: "center",
			padding: theme.spacing(2)
		},
		list: {
			display: "flex",
			flexDirection: "column",
			flexGrow: 1
		},
		settings: {
			marginTop: "auto"
		}
	};
});

const SideDrawer = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();

	const menuItems = [
		{
			text: "General",
			icon: <StarIcon color='secondary' />,
			path: "/chat"
		},
		{
			text: "Sports",
			icon: <SportsFootballIcon color='secondary' />,
			path: "/chat"
		},
		{
			text: "Movies",
			icon: <TheatersIcon color='secondary' />,
			path: "/chat"
		},
		{
			text: "Books",
			icon: <MenuBookIcon color='secondary' />,
			path: "/chat"
		},
		{
			text: "Politics",
			icon: <PublicIcon color='secondary' />,
			path: "/chat"
		},
		{
			text: "Video Games",
			icon: <SportsEsportsIcon color='secondary' />,
			path: "/chat"
		},
		{
			text: "Music",
			icon: <MusicNoteIcon color='secondary' />,
			path: "/chat"
		},
		{
			text: "Technology",
			icon: <ComputerIcon color='secondary' />,
			path: "/chat"
		}
	];

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
						to='/'
						underline='none'
						color='textPrimary'>
						<ChatOutlinedIcon /> Chatter
					</Link>
				</Typography>
				<Divider />
			</div>
			<List className={classes.list}>
				{menuItems.map((item) => (
					<ListItem
						key={item.text}
						button
						onClick={() => history.push(item.path)}
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
					onClick={() => history.push("/settings")}
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
