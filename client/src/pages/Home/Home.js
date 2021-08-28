import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(1)
	},
	banner: {
		// minHeight: "50vh",
		minHeight: "100%"
	},
	bannerContent: {
		padding: theme.spacing(5)
	},
	message: {
		[theme.breakpoints.down("sm")]: {
			display: "none"
		},
		[theme.breakpoints.up("md")]: {
			flexGrow: 1
		}
	},
	form: {
		display: "flex",
		flexDirection: "column"
	},
	choices: {
		[theme.breakpoints.up("md")]: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			marginTop: theme.spacing(5),
			flexGrow: 1
		}
	},
	card: {
		[theme.breakpoints.down("sm")]: {
			margin: "10px 0px"
		},
		[theme.breakpoints.up("md")]: {
			minWidth: "300px"
		}
	},
	button: {
		marginTop: theme.spacing(1)
	}
}));

const Home = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.message}>
				<Card className={classes.banner}>
					<CardContent className={classes.bannerContent}>
						<Typography
							color='textPrimary'
							variant='h2'
							align='left'
							gutterBottom>
							Welcome to Chatter
						</Typography>
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Meet new people, share and laugh.
						</Typography>
						<Typography
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
							className={classes.form}
							noValidate
							autoComplete='off'>
							<TextField
								id='outlined-basic'
								label='Create Room'
								variant='outlined'
							/>
							<Button
								variant='contained'
								color='secondary'
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
							className={classes.form}
							noValidate
							autoComplete='off'>
							<TextField
								id='outlined-basic'
								label='Join Room'
								variant='outlined'
							/>
							<Button
								variant='contained'
								color='secondary'
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
