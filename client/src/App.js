import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";
import Layout from "./components/Layout/Layout";
import { UserContext } from "./contexts/UserContext";
import api from "./utils/api";

const App = () => {
	const [user, setUser] = useState(null);

	const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

	useEffect(() => {
		api.get("/user/profile", {})
			.then((res) => {
				setUser(res.data);
			})
			.catch((err) => {});
	}, []);

	return (
		<UserContext.Provider value={providerValue}>
			<Router>
				<Layout>
					<Routes />
				</Layout>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
