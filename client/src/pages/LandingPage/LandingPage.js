import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column"
	},
	banner: {
		minHeight: "100%"
	},
	bannerContent: {
		padding: theme.spacing(5)
	},
	message: {
		[theme.breakpoints.down("xs")]: {
			display: "none"
		},
		[theme.breakpoints.up("sm")]: {
			flexGrow: 1,
			height: "500px"
		}
	},
	cards: {
		[theme.breakpoints.up("sm")]: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-evenly",
			marginTop: theme.spacing(5),
			flexGrow: 1
		}
	},
	card: {
		[theme.breakpoints.down("xs")]: {
			margin: "10px 50px",
			minWidth: "200px",
			minHeight: "200px"
		},
		[theme.breakpoints.up("sm")]: {
			minWidth: "200px",
			minHeight: "230px"
		}
	}
}));

const LandingPage = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.message}>
				<Card className={classes.banner}>
					<CardContent className={classes.bannerContent}>
						<Typography
							variant='h1'
							component='h2'
							gutterBottom
							align='center'>
							Chatter
						</Typography>
					</CardContent>
				</Card>
			</div>
			<div className={classes.cards}>
				<Card className={classes.card}>
					<CardContent>
						<Typography
							color='textPrimary'
							variant='h6'
							align='center'
							gutterBottom>
							Create a Room
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
							Join a Room
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
							Private Message
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
							Join a Room
						</Typography>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LandingPage;
