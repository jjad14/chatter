import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
	root: {}
}));

const LandingPage = () => {
	const classes = useStyles();
	const history = useHistory();

	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			history.push("/home");
		}
	}, [user, history]);

	return <div className={classes.root}>Landing Page</div>;
};

export default LandingPage;
