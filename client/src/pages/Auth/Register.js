import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { UserContext } from '../../contexts/UserContext';
import { CustomThemeContext } from '../../contexts/CustomThemeProvider';

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	form: {
		marginTop: theme.spacing(1)
	},
	inputImage: {
		display: 'flex',
		flexDirection: 'row'
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	link: {
		display: 'block',
		textAlign: 'center'
	},
	image: {
		minWidth: '100px',
		width: '100px',
		minHeight: '100px',
		height: '100px',
		marginLeft: theme.spacing(2)
	}
}));

const Register = () => {
	const classes = useStyles();

	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [image, setImage] = useState('');
	const [preview, setPreview] = useState('images/user.png');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [emailError, setEmailError] = useState(false);
	const [userNameError, setUserNameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);

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
		setUserNameError(false);
		setPasswordError(false);
		setConfirmPasswordError(false);

		if (email === '') {
			setEmailError(true);
		}

		if (userName === '') {
			setUserNameError(true);
		}

		if (password === '') {
			setPasswordError(true);
		}

		if (confirmPassword === '') {
			setConfirmPasswordError(true);
		}

		if (password !== confirmPassword) {
			setPasswordError(true);
			setConfirmPasswordError(true);
		}

		if (email && userName && password && confirmPassword) {
			const formData = new FormData();
			formData.append('email', email);
			formData.append('userName', userName);
			formData.append('image', image);
			// formData.append("image", URL.revokeObjectURL(image));
			formData.append('password', password);
			formData.append('confirmPassword', confirmPassword);

			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};

			axios
				.post('/api/user', formData, config)
				.then((res) => {
					// save user to context
					setUser(res.data);

					// redirect user to home page
					history.push('/home');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleImage = (e) => {
		setPreview(URL.createObjectURL(e.target.files[0]));
		setImage(e.target.files[0]);
	};

	return (
		<Container component='main' maxWidth='md'>
			<Card className={classes.card}>
				<Typography component='h1' variant='h4'>
					Register
				</Typography>
				<CardContent>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit}>
						<TextField
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='userName'
							label='User Name'
							name='userName'
							autoFocus
							error={userNameError}
							helperText='Username must be a min of 5 characters'
						/>
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
							helperText='A valid email address is required'
						/>
						<div className={classes.inputImage}>
							<Button variant='contained' component='label'>
								<input
									type='file'
									accept='.png, .jpg, .jpeg'
									name='photo'
									onChange={handleImage}
								/>
							</Button>
							<img
								src={preview}
								alt='Profile'
								className={classes.image}
							/>
						</div>
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
							helperText='Password must be a min of 8 characters'
						/>
						<TextField
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='confirmPassword'
							label='Confirm Password'
							type='password'
							id='confirmPassword'
							error={confirmPasswordError}
							helperText='Make sure both passwords match.'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Sign Up
						</Button>

						<Link
							component={RouterLink}
							to='/login'
							variant='body2'
							color={theme ? 'primary' : 'textPrimary'}
							className={classes.link}>
							{'Already have an account? Login here'}
						</Link>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Register;
