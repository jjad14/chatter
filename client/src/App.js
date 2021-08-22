import { BrowserRouter as Router, e } from "react-router-dom";

import Routes from "./components/Routing/Routes";
import Layout from "./components/Layout/Layout";

import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { grey, purple } from "@material-ui/core/colors";

const theme = createTheme({
	palette: {
		primary: grey,
		secondary: purple
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700
	}
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Layout>
					<Routes />
				</Layout>
			</Router>
		</ThemeProvider>
	);
};

export default App;
