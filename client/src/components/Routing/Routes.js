import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ChatRoom from "../ChatRoom/ChatRoom";

const Routes = () => {
	return (
		<>
			<Switch>
				<Route exact path='/'>
					<Login />
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
				<Route path='/profile'>Profile</Route>
			</Switch>
		</>
	);
};

export default Routes;
