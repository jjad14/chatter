import React, { useState, useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";

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
		dropdown: {},
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
		api.delete("/user/logout")
			.then(() => {
				// remove user from context
				setUser(null);
				// redirect user to home page
				history.push("/");

				setAnchorEl(false);
			})
			.catch((err) => {
				console.log(err);
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
						<Typography variant='h5' className={classes.title}>
							<Link
								component={RouterLink}
								to='/'
								underline='none'
								color='inherit'>
								<ChatOutlinedIcon /> Chatter
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
								<span>Welcome {user.userName}</span>&nbsp;
								<AccountCircle />
								{/* TODO: REPLACE ICON ABOVE WILL PROFILE IMAGE - SMALL AND CIRCULAR*/}
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								open={open}
								onClose={handleClose}>
								<MenuItem
									onClick={handleClose}
									component={RouterLink}
									to='/profile'
									color='inherit'>
									Profile
								</MenuItem>
								<MenuItem
									onClick={handleLogout}
									component='button'>
									Logout
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
