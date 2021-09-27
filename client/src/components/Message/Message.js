import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		minWidth: '60%',
		maxWidth: '60%',
		backgroundColor: (props) =>
			props.isUser
				? theme.palette.primary.light
				: theme.palette.grey[500],
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

// single image component, to be used for the ChatBox component
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
						<Typography variant='body1'>{props.content}</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Message;
