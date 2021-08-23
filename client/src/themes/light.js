import { createTheme } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";

const lightTheme = createTheme({
	palette: {
		primary: grey,
		secondary: blue,
		background: {
			default: "#eeeeee"
		}
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
