import React, { useState, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import Message from '../Message/Message';

import { CustomThemeContext } from '../../contexts/CustomThemeProvider';
import { useConversations } from '../../contexts/ConversationProvider';
import { UserContext } from '../../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
	chatSection: {
		width: '100%',
		height: '80vh'
	},
	messageArea: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		height: '70vh',
		overflow: 'auto',
		padding: theme.spacing(1)
	},
	listMessages: {
		height: 'inherit'
	},
	form: {
		width: '100%'
	},
	send: {
		marginLeft: theme.spacing(1)
	},
	submit: {
		flexDirection: 'row'
	},
	input: {
		overflow: 'auto'
	}
}));

// displays a userlist to display messages and an input box for sending a message
// recieves the messages array and room as props
const ChatBox = ({ messages, room }) => {
	const classes = useStyles();
	const { user } = useContext(UserContext);

	const [message, setMessage] = useState('');
	const { currentTheme } = useContext(CustomThemeContext);
	const { sendMessage } = useConversations();

	const theme = currentTheme === 'lightTheme' ? true : false;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (message !== '') {
			sendMessage(message, room);

			setMessage('');
		}
	};

	return (
		<Grid container component={Paper} className={classes.chatSection}>
			<Grid item xs={12}>
				<List className={classes.messageArea}>
					<div className={classes.listMessages}>
						<Message
							key='welcome-message'
							userName='chatter-bot'
							content={`Welcome to the ${room} chat room!`}
							isUser={false}
						/>
						{messages &&
							messages
								.sort()
								.map((message, index) => (
									<Message
										key={index}
										userName={message.sender}
										image={message.image}
										content={message.content}
										isUser={
											message.sender === user.userName
										}
									/>
								))}
					</div>
				</List>
				<Divider />
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container style={{ padding: '15px' }}>
						<Grid item xs={10}>
							<TextField
								id='outlined-basic-email'
								label='Type Something'
								value={message}
								inputProps={{
									maxLength: 180,
									minLength: 1
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
								color={theme ? 'primary' : 'inherit'}
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
