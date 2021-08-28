import React, { useEffect, useState, useContext } from "react";
import { CustomThemeContext } from "../../contexts/CustomThemeProvider";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Switch from "@material-ui/core/Switch";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
}));

const Settings = () => {
	const classes = useStyles();

	const [darkMode, setDarkMode] = useState(false);
	const { currentTheme, setTheme } = useContext(CustomThemeContext);

	useEffect(() => {
		if (currentTheme === "darkTheme") {
			setDarkMode(true);
		}
	}, [currentTheme, setDarkMode]);

	const handleThemeChange = (e) => {
		if (e.target.checked) {
			setTheme("darkTheme");
			setDarkMode(true);
		} else {
			setTheme("lightTheme");
			setDarkMode(false);
		}
	};

	return (
		<Container component='main' maxWidth='md'>
			<Card className={classes.card}>
				<Typography component='h1' variant='h5'>
					Settings
				</Typography>
				<CardContent>
					<FormControl component='fieldset'>
						<FormLabel component='legend'>Toggle Theme</FormLabel>
						<FormGroup>
							<span>
								<FormControlLabel
									control={
										<Switch
											checked={darkMode}
											onChange={(e) =>
												handleThemeChange(e)
											}
											name='dark-mode'
										/>
									}
									label='Dark Mode'
								/>
							</span>
						</FormGroup>
					</FormControl>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Settings;
