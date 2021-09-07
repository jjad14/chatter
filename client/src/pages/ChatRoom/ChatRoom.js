import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import UserList from "../../components/UserList/UserList";
import ChatBox from "../../components/ChatBox/ChatBox";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "row"
	},
	gridContainer: {
		flexGrow: 3
	},
	title: {
		marginBottom: theme.spacing(2),
		paddingLeft: theme.spacing(1)
	},
	usersCard: {
		flexGrow: 1,
		minWidth: "30vh"
	}
}));

const ChatRoom = ({ location }) => {
	const classes = useStyles();

	const [room, setRoom] = useState("");

	useEffect(() => {
		let params = new URLSearchParams(location.search);

		setRoom(params.get("room"));
	}, [location, setRoom]);

	const capitalize = (str) => {
		if (str === "videogames") {
			str = "Video Games";
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	return (
		<div className={classes.root}>
			<div className={classes.gridContainer}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='h5' className={classes.title}>
							{capitalize(room)} Room
						</Typography>
					</Grid>
				</Grid>
				{/* Chat Box */}
				<ChatBox />
			</div>
			<Hidden mdDown>
				<div className={classes.usersCard}>
					<UserList />
				</div>
			</Hidden>
		</div>
	);
};

export default ChatRoom;
