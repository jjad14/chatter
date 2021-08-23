import { createTheme } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";

const darkTheme = createTheme({
	palette: {
		primary: grey,
		secondary: blue,
		background: {
			default: "#616161"
		},
		type: "dark"
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700
	}
});

export default darkTheme;
