import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SideDrawer from './SideDrawer';
import NavBar from './NavBar';
import { UserContext } from '../../contexts/UserContext';
import Footer from './Footer';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex'
		},
		page: {
			width: '100%',
			padding: theme.spacing(3)
		},
		page2: {
			// mainly for landing page
			width: '100%'
		},
		toolbar: theme.mixins.toolbar
	};
});

// Custom layout
const Layout = ({ children }) => {
	const classes = useStyles();

	const { user } = useContext(UserContext);

	return (
		<div className={classes.root}>
			{/* App bar */}
			<NavBar />

			{/* Side drawer */}
			{user && <SideDrawer />}

			<div className={user ? classes.page : classes.page2}>
				<div className={classes.toolbar}></div>
				{children}
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
