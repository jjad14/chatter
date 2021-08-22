import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import SideDrawer from "./SideDrawer";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => {
	return {
		page: {
			width: "100%",
			padding: theme.spacing(3)
		},
		root: {
			display: "flex"
		},
		toolbar: theme.mixins.toolbar
	};
});

const Layout = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{/* App bar */}
			<NavBar />

			{/* Side drawer */}
			<SideDrawer />

			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
};

export default Layout;
