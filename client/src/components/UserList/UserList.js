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

// TODO: remove for production
const users = [
	{
		id: '1',
		userName: 'Mike',
		image: 'https://randomuser.me/api/portraits/women/38.jpg'
	},
	{
		id: '2',
		userName: 'Amy',
		image: 'https://randomuser.me/api/portraits/women/39.jpg'
	},
	{
		id: '3',
		userName: 'Brian',
		image: 'https://randomuser.me/api/portraits/women/40.jpg'
	},
	{
		id: '4',
		userName: 'John',
		image: 'https://randomuser.me/api/portraits/women/41.jpg'
	},
	{
		id: '5',
		userName: 'Sam',
		image: 'https://randomuser.me/api/portraits/women/42.jpg'
	},
	{
		id: '6',
		userName: 'Jim',
		image: 'https://randomuser.me/api/portraits/women/43.jpg'
	},
	{
		id: '7',
		userName: 'Kate',
		image: 'https://randomuser.me/api/portraits/women/44.jpg'
	},
	{
		id: '8',
		userName: 'Meg',
		image: 'https://randomuser.me/api/portraits/women/45.jpg'
	},
	{
		id: '9',
		userName: 'Mike',
		image: 'https://randomuser.me/api/portraits/women/38.jpg'
	},
	{
		id: '10',
		userName: 'Amy',
		image: 'https://randomuser.me/api/portraits/women/39.jpg'
	},
	{
		id: '11',
		userName: 'Brian',
		image: 'https://randomuser.me/api/portraits/women/40.jpg'
	},
	{
		id: '12',
		userName: 'John',
		image: 'https://randomuser.me/api/portraits/women/41.jpg'
	},
	{
		id: '13',
		userName: 'Sam',
		image: 'https://randomuser.me/api/portraits/women/42.jpg'
	},
	{
		id: '14',
		userName: 'Jim',
		image: 'https://randomuser.me/api/portraits/women/43.jpg'
	},
	{
		id: '15',
		userName: 'Kate',
		image: 'https://randomuser.me/api/portraits/women/44.jpg'
	},
	{
		id: '16',
		userName: 'Meg',
		image: 'https://randomuser.me/api/portraits/women/45.jpg'
	}
];

// receives list of users as props
const UserList = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Card className={classes.root}>
				<Typography component='h1' variant='h6' align='center'>
					Users
				</Typography>
				<Divider />
				<CardContent
					style={{
						padding: '0'
					}}>
					<List className={classes.userArea} disablePadding>
						{users.map((user) => (
							<User user={user} />
						))}
					</List>
				</CardContent>
			</Card>
		</div>
	);
};

export default UserList;
