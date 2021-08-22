import React from "react";
import { Route, Switch } from "react-router-dom";

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
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/login'>
					<Login />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				<Route path='/chat'>
					<ChatRoom />
				</Route>
				<Route path='/profile'>
					<Profile />
				</Route>
				<Route path='/settings'>
					<Settings />
				</Route>
			</Switch>
		</>
	);
};

export default Routes;
