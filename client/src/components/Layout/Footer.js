import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
	footer: {
		width: '100%',
		position: 'fixed',
		left: '0',
		bottom: '0',
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
		textAlign: 'center',
		color: '#fff',
		maxHeight: '50px',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.primary.main
				: theme.palette.primary.dark
	}
}));

// Footer component
const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Container maxWidth='lg'>
				<Typography variant='body2' color='inherit'>
					{'Copyright © '}
					<Link
						color='inherit'
						href='https://github.com/jjad14/chatter'>
						Chatter
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Container>
		</footer>
	);
};

export default Footer;
