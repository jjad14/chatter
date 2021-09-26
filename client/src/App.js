import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import Layout from './components/Layout/Layout';
import api from './utils/api';
import { UserContext } from './contexts/UserContext';
import { SocketProvider } from './contexts/SocketProvider';

const App = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

	useEffect(() => {
		api.get('/user/profile')
			.then((res) => {
				setUser(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	}, []);

	return (
		<UserContext.Provider value={providerValue}>
			<SocketProvider value={providerValue.user}>
				{!loading && (
					<Router>
						<Layout>
							<Routes />
						</Layout>
					</Router>
				)}
			</SocketProvider>
		</UserContext.Provider>
	);
};

export default App;
