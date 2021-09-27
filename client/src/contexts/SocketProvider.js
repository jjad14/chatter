import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import { UserContext } from '../contexts/UserContext';

const SocketContext = React.createContext();

const SOCKET_SERVER_URL = 'http://127.0.0.1:8000';

export function useSocket() {
	return useContext(SocketContext);
}

// stores socket in context for app-wide usage
// only create a socket if user is authenticated (backend checks as well)
export function SocketProvider({ children }) {
	const { user } = useContext(UserContext);
	const [socket, setSocket] = useState();

	useEffect(() => {
		let newSocket;
		if (user) {
			// connect to socket server
			newSocket = io(SOCKET_SERVER_URL, {
				query: { userName: user.userName, image: user.image }
			});

			setSocket(newSocket);

			return () => newSocket.close();
		}
	}, [user]);

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
}
