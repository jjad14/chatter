import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	title: {
		marginBottom: theme.spacing(2)
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
	}
}));

const ChatRoom = () => {
	const classes = useStyles();

	return (
		<div>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant='h5' className={classes.title}>
						Chat Room Name
					</Typography>
				</Grid>
			</Grid>
			<Grid container component={Paper} className={classes.chatSection}>
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
						<Grid xs={1} align='right'>
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
	);
};

export default ChatRoom;
