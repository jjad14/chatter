import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

const useStyles = makeStyles({
	root: {
		height: "100%",
		paddingLeft: 5
	}
});

const UserList = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Card className={classes.root}>
				<Typography component='h1' variant='h6' align='center'>
					Users
				</Typography>
				<Divider />
				<CardContent>
					<List className={classes.userArea}></List>
				</CardContent>
			</Card>
		</div>
	);
};

export default UserList;
