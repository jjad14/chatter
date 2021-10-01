import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-evenly'
		}
	},
	card: {
		[theme.breakpoints.down('sm')]: {
			margin: '10px 50px',
			minWidth: '200px',
			minHeight: '200px'
		},
		[theme.breakpoints.up('md')]: {
			minWidth: '300px',
			minHeight: '230px'
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
			</div>
			<div>
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
				<Card className={classes.card}>
					<CardContent>
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Create your own Room
						</Typography>
					</CardContent>
				</Card>
				<Card className={classes.card}>
					<CardContent>
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Private Messaging
						</Typography>
					</CardContent>
				</Card>
				<Card className={classes.card}>
					<CardContent>
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
