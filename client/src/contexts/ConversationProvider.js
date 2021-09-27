import React, { useEffect, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSocket } from './SocketProvider';
import { UserContext } from './UserContext';

const ConversationsContext = React.createContext();

export function useConversations() {
	return useContext(ConversationsContext);
}

// Emit
// join-room  ->  pass room name and cb
// send-message  ->  pass content, to, sender, image

// listen
// new-user  ->  recieve new user, add to state
// new-message  ->  recieve new message, add to state

// context stores the result of emits and also listens to socket events
export function ConversationsProvider({ children }) {
	// default local storage
	const [conversation, setConversation] = useLocalStorage('conversation', {
		room: '',
		messages: [],
		users: []
	});

	const { user } = useContext(UserContext);
	const socket = useSocket();

	// add message to array in conversation state
	const addMessageToConversation = useCallback(
		({ content, to, sender, image }) => {
			setConversation((prevConversation) => ({
				...prevConversation,
				messages: [
					...prevConversation.messages,
					{ content, to, sender, image }
				]
			}));
		},
		[setConversation]
	);

	// add user to array in conversation state
	const addUserToConversation = useCallback(
		({ id, userName, image }) => {
			setConversation((prevConversation) => ({
				...prevConversation,
				users: [...prevConversation.users, { id, userName, image }]
			}));
		},
		[setConversation]
	);

	// add user to array in conversation state
	const removeUserFromConversation = useCallback(
		({ id }) => {
			// find user by id then remove it from array
			setConversation((prevConversation) => ({
				...prevConversation,
				users: [
					...prevConversation.users.filter((user) => user.id !== id)
				]
			}));
		},
		[setConversation]
	);

	useEffect(() => {
		if (socket == null) return;

		socket.on('new-message', addMessageToConversation);

		return () => socket.off('new-message');
	}, [socket, addMessageToConversation]);

	useEffect(() => {
		if (socket == null) return;

		socket.on('new-user', addUserToConversation);

		return () => socket.off('new-user');
	}, [socket, addUserToConversation]);

	useEffect(() => {
		if (socket == null) return;

		socket.on('user-leave', removeUserFromConversation);

		return () => socket.off('user-leave');
	}, [socket, removeUserFromConversation]);

	// join a room by emitting event to server
	const joinConversation = (roomName) => {
		// join room and get messages and users of that room
		socket.emit('join-room', roomName, (messages, users) => {
			setConversation({
				room: roomName,
				messages: messages ? [...messages] : [],
				users: users ? [...users] : []
			});
		});
	};

	// send a message to server
	const sendMessage = (message, room) => {
		const newMessage = {
			content: message,
			to: room,
			sender: user.userName,
			image: user.image
		};

		socket.emit('send-message', newMessage);

		addMessageToConversation(newMessage);
	};

	const value = {
		conversation,
		joinConversation,
		sendMessage
	};

	return (
		<ConversationsContext.Provider value={value}>
			{children}
		</ConversationsContext.Provider>
	);
}
