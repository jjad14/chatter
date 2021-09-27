import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import User from '../User/User';

const useStyles = makeStyles({
	root: {
		height: '100%',
		paddingLeft: 5
	},
	userArea: {
		height: '80vh',
		overflow: 'auto'
	}
});

// receives list of users as props
const UserList = ({ users }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Card className={classes.root}>
				<Typography component='h1' variant='h6' align='center'>
					In Chat
				</Typography>
				<Divider />
				<CardContent
					style={{
						padding: '0'
					}}>
					<List className={classes.userArea} disablePadding>
						{users &&
							users.map((user) => (
								<User key={user.id} user={user} />
							))}
					</List>
				</CardContent>
			</Card>
		</div>
	);
};

export default UserList;
