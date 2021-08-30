import React, { useState, useContext } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	form: {
		width: "50vh",
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	link: {
		display: "block",
		textAlign: "center"
	},
	image: {
		minWidth: "90px",
		width: "90px",
		minHeight: "90px",
		height: "90px",
		marginLeft: theme.spacing(2)
	}
}));

const Profile = () => {
	const classes = useStyles();

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState(user.email);
	const [userName, setUserName] = useState(user.userName);
	const [image, setImage] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [emailError, setEmailError] = useState(false);
	const [userNameError, setUserNameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setEmailError(false);
		setUserNameError(false);
		setPasswordError(false);
		setConfirmPasswordError(false);

		if (email === "") {
			setEmailError(true);
		}

		if (userName === "") {
			setUserNameError(true);
		}

		if (newPassword !== confirmPassword) {
			setPasswordError(true);
			setConfirmPasswordError(true);
		}

		if (email && userName) {
			const formData = new FormData();
			formData.append("email", email);
			formData.append("userName", userName);
			formData.append("image", image);
			formData.append("password", newPassword);
			formData.append("confirmPassword", confirmPassword);

			const config = {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			};
			axios
				.put("/api/user/profile", formData, config)
				.then((res) => {
					// save user to context
					setUser(res.data);
					setSuccess(true);
				})
				.catch((err) => {
					setError(true);
				});
		}
	};

	const handleImage = (e) => {
		setImage(e.target.files[0]);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSuccess(false);
	};

	return (
		<Container component='main' maxWidth='md'>
			<Snackbar
				open={success}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right"
				}}>
				<Alert onClose={handleClose} severity='success'>
					Profile has been updated
				</Alert>
			</Snackbar>
			<Snackbar
				open={error}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right"
				}}>
				<Alert onClose={handleClose} severity='error'>
					Error Updating Profile
				</Alert>
			</Snackbar>

			{/* <Alert severity='success'>Profile has been updated!</Alert> */}
			<Card className={classes.card}>
				<Typography component='h1' variant='h4'>
					Profile Settings
				</Typography>
				<CardContent>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmit}
						encType='multipart/form-data'>
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
						<Button variant='contained' component='label'>
							Upload File
							<input
								type='file'
								accept='.png, .jpg, .jpeg'
								name='photo'
								onChange={handleImage}
							/>
						</Button>
						<img
							src={user.image}
							alt={user.userName}
							className={classes.image}
						/>
						<TextField
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							variant='outlined'
							margin='normal'
							fullWidth
							name='password'
							label='New Password'
							type='password'
							id='password'
							autoComplete='current-password'
							error={passwordError}
							helperText='Enter your new password'
						/>
						<TextField
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							variant='outlined'
							margin='normal'
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
							Update Profile
						</Button>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Profile;
