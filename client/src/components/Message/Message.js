import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		minWidth: '40%',
		maxWidth: '60%',
		backgroundColor: (props) =>
			props.isUser
				? theme.palette.grey[500]
				: theme.palette.primary.light,
		float: (props) => (props.isUser ? 'right' : 'left'),
		margin: theme.spacing(1),
		[theme.breakpoints.down('sm')]: {
			minHeight: '20%'
		},
		[theme.breakpoints.up('md')]: {
			minHeight: '20%'
		}
	},
	message: {
		display: 'flex',
		padding: theme.spacing(2)
	},
	avatarContainer: {
		marginRight: theme.spacing(1)
	}
}));

// single message component
// receives a single message
// message has users name, image, content
// check if its current users
// display right with grey color if users own message
// display left if its not their message

// ideally want to have image (rounded), content as a input or label with users name on top

const Message = (props) => {
	const classes = useStyles(props);

	return (
		<Card className={classes.root}>
			<CardContent className={classes.message}>
				<div className={classes.avatarContainer}>
					<Avatar
						alt={props.userName}
						src={props.image}
						variant='circular'
					/>
				</div>
				<div className={classes.contentContainer}>
					<div className={classes.userName}>
						<Typography variant='subtitle2' gutterBottom>
							Sent By {props.userName}
						</Typography>
					</div>
					<div className={classes.content}>
						<Typography variant='body2'>{props.content}</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Message;
