import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import SideDrawer from "./SideDrawer";
import NavBar from "./NavBar";
import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: "flex"
		},
		page: {
			width: "100%",
			padding: theme.spacing(3)
		},
		toolbar: theme.mixins.toolbar
	};
});

const Layout = ({ children }) => {
	const classes = useStyles();

	const { user } = useContext(UserContext);

	return (
		<div className={classes.root}>
			{/* App bar */}
			<NavBar />

			{/* Side drawer */}
			{user && <SideDrawer />}

			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
};

export default Layout;
