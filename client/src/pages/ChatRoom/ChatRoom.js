import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Hidden from "@material-ui/core/Hidden";

import UserList from "./UserList";

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
	chatSection: {
		width: "100%",
		height: "80vh"
	},
	messageArea: {
		height: "70vh",
		overflowY: "auto"
	},
	send: {
		marginLeft: theme.spacing(1)
	},
	usersCard: {
		flexGrow: 1
	}
}));

const ChatRoom = ({ match }) => {
	const classes = useStyles();
	const [room, setRoom] = useState("");

	useEffect(() => {
		setRoom(match.params.room);
	}, [match.params.room]);

	return (
		<div className={classes.root}>
			<div className={classes.gridContainer}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='h5' className={classes.title}>
							{room}
						</Typography>
					</Grid>
				</Grid>
				<Grid
					container
					component={Paper}
					className={classes.chatSection}>
					<Grid item xs={12}>
						{/* Messages here */}
						<List className={classes.messageArea}></List>
						<Divider />
						<Grid container style={{ padding: "20px" }}>
							<Grid item xs={11}>
								<TextField
									id='outlined-basic-email'
									label='Type Something'
									fullWidth
								/>
							</Grid>
							<Grid item xs={1} align='right'>
								{/* onClick, submit message */}
								<IconButton
									aria-label='send'
									color='secondary'
									className={classes.send}>
									<SendIcon />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
			<Hidden smDown>
				<div className={classes.usersCard}>
					<UserList />
				</div>
			</Hidden>
		</div>
	);
};

export default ChatRoom;
