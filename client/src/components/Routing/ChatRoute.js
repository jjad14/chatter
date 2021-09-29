import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useConversations } from '../../contexts/ConversationProvider';
import { UserContext } from '../../contexts/UserContext';

// Chat route, user must be authenticated and there must be a conversation in ls
const ChatRoute = ({ component: Component, ...rest }) => {
	const { conversation } = useConversations();
	const { user } = useContext(UserContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				!user ? (
					<Redirect to='/login' />
				) : !conversation.room ? (
					<Redirect to='/home' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default ChatRoute;
