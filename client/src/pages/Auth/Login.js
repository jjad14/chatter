import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import api from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import { CustomThemeContext } from '../../contexts/CustomThemeProvider';

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: theme.spacing(5),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	form: {
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	link: {
		display: 'block',
		textAlign: 'center'
	}
}));

const Login = () => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const { user, setUser } = useContext(UserContext);
	const { currentTheme } = useContext(CustomThemeContext);

	const theme = currentTheme === 'lightTheme' ? true : false;
	const history = useHistory();

	useEffect(() => {
		if (user) {
			history.push('/home');
		}
	}, [user, history]);

	const handleSubmit = (e) => {
		e.preventDefault();

		setEmailError(false);
		setPasswordError(false);

		if (email === '') {
			setEmailError(true);
		}

		if (password === '') {
			setPasswordError(true);
		}

		if (email && password) {
			api.post('/user/login', {
				email,
				password
			})
				.then((res) => {
					// save user to context
					setUser(res.data);
					// redirect user to home page
					history.push('/home');
				})
				.catch((err) => {
					console.log(err.toString());
				});
		}
	};

	return (
		<Container component='main' maxWidth='md'>
			<Card className={classes.card}>
				<Typography component='h1' variant='h4'>
					Login
				</Typography>
				<CardContent>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit}>
						<TextField
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							error={emailError}
						/>
						<TextField
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							error={passwordError}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Sign In
						</Button>

						<Link
							component={RouterLink}
							to='/register'
							variant='body2'
							color={theme ? 'primary' : 'textPrimary'}
							className={classes.link}>
							{"Don't have an account? Register Here"}
						</Link>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Login;
