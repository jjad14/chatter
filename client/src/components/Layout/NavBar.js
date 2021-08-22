import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		appbar: {
			width: `calc(100% - ${drawerWidth}px)`
		},
		header: {
			flexGrow: 1
		},
		links: {
			display: "flex",
			justifyContent: "flex-end",
			flexGrow: 1
		},
		link: {
			padding: 5
		}
	};
});

const NavBar = () => {
	const classes = useStyles();

	return (
		<AppBar className={classes.appbar} elevation={1} color='secondary'>
			<Toolbar>
				<Box
					component='div'
					display={{ xs: "none", md: "block" }}
					className={classes.header}>
					<Typography>Make friends, Share and Laugh!</Typography>
				</Box>

				{/* Hide when user is authenticated - display user icon dropdown */}
				<Typography className={classes.links}>
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
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
