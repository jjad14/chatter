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
// create-room  -> pass room name and cb
// send-message  ->  pass content, to, sender, image
// unsubscribe -> pass room name

// Listen
// new-user  ->  recieve new user, add to state
// new-message  ->  recieve new message, add to state
// user-left -> recieve socket id

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
		(id) => {
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

		socket.on('user-left', removeUserFromConversation);

		return () => socket.off('user-left');
	}, [socket, removeUserFromConversation]);

	// join a room by emitting event to server
	const joinConversation = (roomName) => {
		// join room and get messages and users of that room
		return new Promise(function (resolve, reject) {
			socket.emit('join-room', roomName, (error, result) => {
				if (error !== null) {
					reject(error);
				} else {
					setConversation({
						room: roomName,
						messages: result.messages ? [...result.messages] : [],
						users: result.users ? [...result.users] : []
					});

					resolve();
				}
			});
		});
	};

	// join a room by emitting event to server
	const createConversation = (roomName) => {
		return new Promise(function (resolve, reject) {
			// create room
			socket.emit('create-room', roomName, (error, result) => {
				if (error !== null) {
					reject(error);
				} else {
					setConversation({
						room: roomName,
						messages: result.messages ? [...result.messages] : [],
						users: result.users ? [...result.users] : []
					});

					resolve();
				}
			});
		});
	};

	const leaveChatRoom = (roomName) => {
		socket.emit('unsubscribe', roomName, (error, result) => {
			setConversation({
				room: '',
				messages: [],
				users: []
			});
		});
	};

	const resetConversation = () => {
		setConversation({
			room: '',
			messages: [],
			users: []
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
	};

	const value = {
		conversation,
		joinConversation,
		createConversation,
		leaveChatRoom,
		resetConversation,
		sendMessage
	};

	return (
		<ConversationsContext.Provider value={value}>
			{children}
		</ConversationsContext.Provider>
	);
}
