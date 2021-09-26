import React, { useEffect, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext();

export function useConversations() {
	return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
	const [conversation, setConversation] = useLocalStorage('conversation', []);

	const { socket } = useSocket();

	useEffect(() => {}, []);

	const joinConversation = () => {};

	const getMessages = () => {};

	const getUsersInChatRoom = () => {};

	const addMessageToConversation = () => {};

	const sendMessage = () => {};

	return (
		<ConversationsContext.Provider value={{}}>
			{children}
		</ConversationsContext.Provider>
	);
}
