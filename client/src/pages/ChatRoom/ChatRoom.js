import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import SendIcon from "@material-ui/icons/Send";
import ImageIcon from "@material-ui/icons/Image";

import UserList from "./UserList";

import { CustomThemeContext } from "../../contexts/CustomThemeProvider";

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
	form: {
		width: "100%"
	},
	send: {
		marginLeft: theme.spacing(1)
	},
	usersCard: {
		flexGrow: 1
	}
}));

const ChatRoom = ({ location }) => {
	const classes = useStyles();

	const [room, setRoom] = useState("");
	const [users, setUsers] = useState([]);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");

	const { currentTheme } = useContext(CustomThemeContext);

	const theme = currentTheme === "lightTheme" ? true : false;

	useEffect(() => {
		let params = new URLSearchParams(location.search);

		setRoom(params.get("room"));
	}, [location, setRoom]);

	const capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(message);

		setMessage("");
	};

	return (
		<div className={classes.root}>
			<div className={classes.gridContainer}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='h5' className={classes.title}>
							{capitalize(room)} room
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
						<form className={classes.form} onSubmit={handleSubmit}>
							<Grid container style={{ padding: "15px" }}>
								<Grid item xs={10}>
									<TextField
										id='outlined-basic-email'
										label='Type Something'
										value={message}
										onChange={(e) =>
											setMessage(e.target.value)
										}
										fullWidth
									/>
								</Grid>
								<Grid item xs={1} align='right'>
									{/* onClick, submit message */}
									<IconButton
										aria-label='send'
										color={theme ? "primary" : "inherit"}
										type='submit'
										className={classes.send}>
										<ImageIcon />
									</IconButton>
								</Grid>
								<Grid item xs={1} align='right'>
									{/* onClick, submit message */}
									<IconButton
										aria-label='send'
										color={theme ? "primary" : "inherit"}
										type='submit'>
										<SendIcon />
									</IconButton>
								</Grid>
							</Grid>
						</form>
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
