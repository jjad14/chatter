import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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

// comprises of the chatbox and userlist
const ChatRoom = () => {
	const classes = useStyles();
	const history = useHistory();
	const { conversation, leaveChatRoom } = useConversations();

	useEffect(() => {
		const unlisten = history.listen((location) => {
			if (location.pathname !== `/chat/${conversation.room}`) {
				leaveChatRoom(conversation.room);
			}
		});
		return function cleanup() {
			unlisten();
		};
	}, [history, leaveChatRoom, conversation.room]);

	return (
		<div className={classes.root}>
			<div className={classes.gridContainer}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='h5' className={classes.title}>
							{conversation.room} Room
						</Typography>
					</Grid>
				</Grid>
				<ChatBox
					room={conversation.room}
					messages={conversation.messages}
				/>
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
