import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { useConversations } from '../../contexts/ConversationProvider';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(1)
	},
	banner: {
		backgroundImage: `url(/images/background.jpg)`,
		backgroundPosition: '25% 75%',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		opacity: '0.9',
		minHeight: '100%'
	},
	bannerContent: {
		padding: theme.spacing(5)
	},
	text: {
		fontWeight: 'bold',
		color: '#fff',
		textShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black'
	},
	message: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		},
		[theme.breakpoints.up('md')]: {
			flexGrow: 1
		}
	},
	form: {
		display: 'flex',
		flexDirection: 'column'
	},
	choices: {
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-evenly',
			marginTop: theme.spacing(5),
			flexGrow: 1
		}
	},
	card: {
		[theme.breakpoints.down('sm')]: {
			margin: '10px 0px'
		},
		[theme.breakpoints.up('md')]: {
			minWidth: '300px'
		}
	},
	button: {
		marginTop: theme.spacing(1)
	}
}));

const Home = () => {
	const classes = useStyles();

	const { joinConversation, createConversation, resetConversation } =
		useConversations();

	const [createdRoom, setCreatedRoom] = useState('');
	const [joinedRoom, setJoinedRoom] = useState('');

	const history = useHistory();

	useEffect(() => {
		resetConversation();
		// eslint-disable-next-line
	}, []);

	const createRoomHandler = (e) => {
		e.preventDefault();

		createConversation(createdRoom)
			.then(() => history.push('/chat/' + createdRoom))
			.catch((error) => {
				setCreatedRoom('');
				console.log(error);
			});
	};

	const joinRoomHandler = (e) => {
		e.preventDefault();

		joinConversation(joinedRoom)
			.then(() => history.push('/chat/' + createdRoom))
			.catch((error) => {
				setJoinedRoom('');
				console.log(error);
			});
	};

	return (
		<div className={classes.root}>
			<div className={classes.message}>
				<Card className={classes.banner}>
					<CardContent className={classes.bannerContent}>
						<Typography
							className={classes.text}
							color='textPrimary'
							variant='h2'
							align='left'
							gutterBottom>
							Welcome to Chatter
						</Typography>
						<Typography
							className={classes.text}
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Meet new people, share and laugh.
						</Typography>
						<Typography
							className={classes.text}
							color='textPrimary'
							variant='h6'
							align='right'
							gutterBottom>
							Start chattering now! Join or create your own room
							today!
						</Typography>
					</CardContent>
				</Card>
			</div>
			<div className={classes.choices}>
				<Card className={classes.card}>
					<CardContent>
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Create a Room
						</Typography>
						<form
							onSubmit={createRoomHandler}
							className={classes.form}
							noValidate
							autoComplete='off'>
							<TextField
								id='outlined-basic'
								label='Room Name'
								variant='outlined'
								value={createdRoom}
								onChange={(e) => setCreatedRoom(e.target.value)}
							/>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className={classes.button}>
								Create
							</Button>
						</form>
					</CardContent>
				</Card>
				<Card className={classes.card}>
					<CardContent>
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Join a Room
						</Typography>

						<form
							onSubmit={joinRoomHandler}
							className={classes.form}
							noValidate
							autoComplete='off'>
							<TextField
								id='outlined-basic'
								label='Room Name'
								variant='outlined'
								value={joinedRoom}
								onChange={(e) => setJoinedRoom(e.target.value)}
							/>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className={classes.button}>
								Join
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Home;
