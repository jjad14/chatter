import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import UserList from '../../components/UserList/UserList';
import ChatBox from '../../components/ChatBox/ChatBox';

import { useConversations } from '../../contexts/ConversationProvider';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row'
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
		minWidth: '30vh'
	}
}));

const ChatRoom = () => {
	const classes = useStyles();

	const [room, setRoom] = useState('');

	const { conversation, joinConversation } = useConversations();

	let { id } = useParams();

	useEffect(() => {
		setRoom(id);
		joinConversation(id);

		// eslint-disable-next-line
	}, [id]);

	return (
		<div className={classes.root}>
			<div className={classes.gridContainer}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='h5' className={classes.title}>
							{room} Room
						</Typography>
					</Grid>
				</Grid>
				<ChatBox room={room} messages={conversation.messages} />
			</div>
			<Hidden mdDown>
				<div className={classes.usersCard}>
					<UserList users={conversation.users} />
				</div>
			</Hidden>
		</div>
	);
};

export default ChatRoom;
