import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import Divider from "@material-ui/core/Divider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		page: {
			background: "#f9f9f9",
			width: "100%",
			padding: theme.spacing(3)
		},
		drawer: {
			width: drawerWidth
		},
		drawerPaper: {
			width: drawerWidth
		},
		root: {
			display: "flex"
		},
		title: {
			display: "block",
			textAlign: "center",
			padding: theme.spacing(2),
			textDecoration: "none"
		},
		appbar: {
			width: `calc(100% - ${drawerWidth}px)`,
			background: "#ffffff"
		},
		toolbar: theme.mixins.toolbar,
		header: {
			flexGrow: 1
		},
		link: {
			padding: 5
		}
	};
});

const Layout = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{/* App bar */}
			<AppBar className={classes.appbar} elevation={1}>
				<Toolbar>
					<Typography className={classes.header}>
						Make friends, Share and Laugh!
					</Typography>

					<Typography>
						<Link className={classes.link} href='/login'>
							Login
						</Link>
						<Link className={classes.link} href='/register'>
							Register
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>

			{/* Side drawer */}
			<Drawer
				className={classes.drawer}
				variant='permanent'
				anchor='left'
				classes={{ paper: classes.drawerPaper }}>
				<div>
					<Typography variant='h5' className={classes.title}>
						<Link href='/'>
							<ChatOutlinedIcon /> Chatter
						</Link>
					</Typography>
					<Divider />
				</div>
			</Drawer>

			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
};

export default Layout;
