import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// recieves username, image, id
const User = ({ user }) => {
	return (
		<ListItem button divider alignItems='flex-start'>
			<ListItemAvatar>
				<Avatar
					alt={user.userName}
					src={user.image}
					variant='circular'
				/>
			</ListItemAvatar>
			<ListItemText id={user.userName} primary={user.userName} />
		</ListItem>
	);
};

export default User;
