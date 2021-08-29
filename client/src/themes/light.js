import { createTheme } from "@material-ui/core/styles";
import { blue, grey, red, black } from "@material-ui/core/colors";

const lightTheme = createTheme({
	palette: {
		primary: {
			light: "#63a4ff",
			main: "#1976d2",
			dark: "#004ba0",
			contrastText: "#fff"
		},
		secondary: {
			light: "#718792",
			main: "#455a64",
			dark: "#1c313a",
			contrastText: "#ffffff"
		},
		background: {
			default: "#eeeeee"
		},
		type: "light"
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700
	}
});

export default lightTheme;
