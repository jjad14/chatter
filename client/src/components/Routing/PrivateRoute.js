import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

// Private Route, for routes that require an authenticated user, redirects otherwise
const PrivateRoute = ({ component: Component, ...rest }) => {
	const { user } = useContext(UserContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				!user ? <Redirect to='/login' /> : <Component {...props} />
			}
		/>
	);
};

export default PrivateRoute;
