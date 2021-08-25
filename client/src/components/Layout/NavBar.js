import React, { useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import api from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		appbar: {
			width: `calc(100% - ${drawerWidth}px)`
		},
		appbarNoDrawer: {
			width: "100%"
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
			padding: 5,
			textTransform: "none"
		}
	};
});

const NavBar = () => {
	const classes = useStyles();

	const { user, setUser } = useContext(UserContext);

	const history = useHistory();

	const handleLogout = () => {
		api.delete("/user/logout")
			.then(() => {
				// remove user from context
				setUser(null);
				// redirect user to home page
				history.push("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<AppBar
			className={user ? classes.appbar : classes.appbarNoDrawer}
			elevation={1}
			color='secondary'>
			<Toolbar>
				<Box
					component='div'
					display={{ xs: "none", md: "block" }}
					className={classes.header}>
					<Typography>Make friends, Share and Laugh!</Typography>
				</Box>

				{/* Hide when user is authenticated - display user icon dropdown */}
				<Typography className={classes.links}>
					{user ? (
						<Button
							className={classes.link}
							color='inherit'
							onClick={handleLogout}>
							Logout
						</Button>
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
