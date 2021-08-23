import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import CustomThemeProvider from "./contexts/CustomThemeProvider";

import "./index.css";
import App from "./App";

ReactDOM.render(
	<CustomThemeProvider>
		<CssBaseline />
		<App />
	</CustomThemeProvider>,
	document.getElementById("root")
);
