import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import Message from "../Message/Message";

import { CustomThemeContext } from "../../contexts/CustomThemeProvider";

const useStyles = makeStyles((theme) => ({
	chatSection: {
		width: "100%",
		height: "80vh"
	},
	messageArea: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		height: "70vh",
		overflow: "auto",
		padding: theme.spacing(1)
	},
	listMessages: {
		height: "inherit"
	},
	form: {
		width: "100%"
	},
	send: {
		marginLeft: theme.spacing(1)
	},
	submit: {
		flexDirection: "row"
	},
	input: {
		overflow: "auto"
	}
}));

// props to recieve
// messages of the current chat
// chat room name

const ChatBox = (props) => {
	const classes = useStyles();

	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const { currentTheme } = useContext(CustomThemeContext);

	const theme = currentTheme === "lightTheme" ? true : false;

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(message);

		setMessage("");
	};

	return (
		<Grid container component={Paper} className={classes.chatSection}>
			<Grid item xs={12}>
				{/* Messages here */}
				<List className={classes.messageArea}>
					<div className={classes.listMessages}>
						<Message
							userName='jjad14'
							image='https://randomuser.me/api/portraits/women/40.jpg'
							content='Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quos blanditiis tenetur unde suscipit, quam beatae
                            rerum inventore consectetur, neque doloribus, cupiditate
                            numquam dignissimos laborum fugiat deleniti?'
							isUser={true}
						/>
						<Message
							userName='guts200'
							image='https://randomuser.me/api/portraits/women/41.jpg'
							content='Quos blanditiis tenetur unde suscipit, quam beatae
                            rerum inventore consectetur, neque doloribus, cupiditate
                            numquam dignissimos laborum fugiat deleniti? Eum quasi
                            quidem quibusdam.'
							isUser={false}
						/>
						<Message
							userName='John19'
							image='https://randomuser.me/api/portraits/women/42.jpg'
							content='Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quos blanditiis tenetur unde suscipit, quam beatae
                            rerum inventore consectetur, neque doloribus, cupiditate
                            numquam dignissimos laborum fugiat deleniti?'
							isUser={true}
						/>
						<Message
							userName='Jane22'
							image='https://randomuser.me/api/portraits/women/43.jpg'
							content='Quos blanditiis tenetur unde suscipit, quam beatae
                            rerum inventore consectetur, neque doloribus, cupiditate
                            numquam dignissimos laborum fugiat deleniti? Eum quasi
                            quidem quibusdam.'
							isUser={false}
						/>
						<Message
							userName='Jane22'
							image='https://randomuser.me/api/portraits/women/43.jpg'
							content='Quos blanditiis'
							isUser={false}
						/>
					</div>
				</List>
				<Divider />
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container style={{ padding: "15px" }}>
						<Grid item xs={10}>
							<TextField
								id='outlined-basic-email'
								label='Type Something'
								value={message}
								inputProps={{
									maxLength: 180
								}}
								className={classes.input}
								onChange={(e) => setMessage(e.target.value)}
								fullWidth
							/>
							<Typography variant='overline'>
								{message.length}/180
							</Typography>
						</Grid>
						<Grid
							item
							xs={2}
							align='center'
							className={classes.submit}>
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
	);
};

export default ChatBox;
