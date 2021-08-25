import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import ChatRoom from "../../pages/ChatRoom/ChatRoom";
import Settings from "../../pages/Settings/Settings";
import Profile from "../../pages/Profile/Profile";
import Home from "../../pages/Home/Home";

const Routes = () => {
	return (
		<>
			<Switch>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				<PrivateRoute path='/chat' component={ChatRoom} />
				<PrivateRoute path='/profile' component={Profile} />
				<PrivateRoute path='/settings' component={Settings} />
				<Route exact path='/'>
					<Home />
				</Route>
			</Switch>
		</>
	);
};

export default Routes;
