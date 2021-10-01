import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		height: '90vh',
		backgroundImage: `url(/images/background.jpg)`,
		backgroundPosition: '25% 75%',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		opacity: '0.9'
	},
	title: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	text: {
		fontWeight: 'bold',
		color: '#fff',
		textShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black'
	},
	cards: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column'
		},
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-evenly'
		}
	},
	card: {
		[theme.breakpoints.down('sm')]: {
			alignSelf: 'center',
			margin: theme.spacing(0.5),
			padding: theme.spacing(0.5),
			width: '200px',
			maxWidth: '200px',
			minHeight: '100px'
		},
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(1),
			minWidth: '300px',
			minHeight: '230px'
		}
	},
	media: {
		margin: '0 auto',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '150px',
			minHeight: '150px'
		},
		[theme.breakpoints.up('md')]: {
			maxWidth: '240px',
			minHeight: '240px'
		}
	}
}));

const LandingPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography
					className={classes.text}
					color='textPrimary'
					variant='h2'
					align='center'
					gutterBottom>
					Chatter, meet new people, share and laugh.
				</Typography>
				<Typography
					className={classes.text}
					color='textPrimary'
					variant='h4'
					align='center'
					gutterBottom>
					Join or create your own room today! Create an account to
					start chattering now!
				</Typography>
			</div>
			<div className={classes.cards}>
				<Card className={classes.card} raised>
					<CardMedia
						className={classes.media}
						image='images/chat.svg'
						title='Create your own room'
					/>
					<CardContent>
						<hr />
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Create your own Room
						</Typography>
					</CardContent>
				</Card>
				<Card className={classes.card} raised>
					<CardMedia
						className={classes.media}
						image='images/message.svg'
						title='Private Messaging'
					/>
					<CardContent>
						<hr />
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Private Messaging
						</Typography>
					</CardContent>
				</Card>
				<Card className={classes.card} raised>
					<CardMedia
						className={classes.media}
						image='images/video.svg'
						title='Video Calls'
					/>
					<CardContent>
						<hr />
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Video Calls
						</Typography>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LandingPage;
