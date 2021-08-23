import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./components/Routing/Routes";
import Layout from "./components/Layout/Layout";

const App = () => {
	return (
		<Router>
			<Layout>
				<Routes />
			</Layout>
		</Router>
	);
};

export default App;
