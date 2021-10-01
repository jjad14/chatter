import express from 'express';

import { createServer } from 'http';
import { Server } from 'socket.io';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import colors from 'colors';
import session from 'express-session';

import connectDB from './data/db.js';
import userRoutes from './routes/user.js';
import { notFound, errorHandler } from './middleware/errors.js';

dotenv.config();

// create express app
const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*'
	}
}).listen(8000);

// Connect to database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
);

const sessionMiddleware = session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
});

// Connection now authenticated to receive further events
io.use(function (socket, next) {
	sessionMiddleware(socket.request, socket.request.res || {}, next);
});

app.use(sessionMiddleware);

let users = [];

const defaultRooms = [
	'General',
	'Sports',
	'Movies',
	'Books',
	'Politics',
	'Games',
	'Music',
	'Technology'
];

const messages = {
	General: [],
	Sports: [],
	Movies: [],
	Books: [],
	Politics: [],
	Games: [],
	Music: [],
	Technology: []
};

io.on('connection', (socket) => {
	const { userName, image } = socket.handshake.query;

	const user = {
		id: socket.id,
		userName,
		image
	};

	users.push(user);

	// join a room
	socket.on('join-room', async (roomName, cb) => {
		if (messages[roomName]) {
			const rooms = socket.rooms;

			// users can only join one room at a time, remove user from any existing room they are in before joining a new one
			rooms.forEach(function (room) {
				socket.to(room).emit('user-left', socket.id);
				socket.leave(room);
			});

			// join the room
			socket.join(roomName);

			// emit new user to all users in that chat room
			socket.to(roomName).emit('new-user', user);

			// get all sockets in that room
			const sockets = await io.in(roomName).fetchSockets();

			// get all users in a room using the sockets
			const usersInRoom = users.filter((u) =>
				sockets.some((s) => u.id === s.id)
			);

			cb(null, { messages: messages[roomName], users: usersInRoom });
		} else {
			// room does not exist
			const error = new Error('Room does not exist');
			cb(error.toString());
		}
	});

	// create a room
	socket.on('create-room', (roomName, cb) => {
		// check if room does not exist,
		if (!messages[roomName]) {
			// create room
			messages[roomName] = [];

			// join room
			socket.join(roomName);

			cb(null, { messages: messages[roomName], users: [] });
		} else {
			// room exists - return error
			const error = new Error('Room already exists');
			cb(error.toString());
		}
	});

	// send a message
	socket.on('send-message', ({ content, to, sender, image }) => {
		// message to chat room
		const payload = {
			content,
			to,
			sender,
			image
		};

		// emit message to all users in chat room
		socket.to(to).emit('new-message', payload);

		// For creating/joining a custom room
		// check if chat room exists
		if (messages[to]) {
			// push message to chatroom messages
			messages[to].push(payload);
		}
	});

	// TODO: remove user from userlist when they leave chatroom
	// check if room is empty - if so remove from array
	// can change name to 'leave-room'
	socket.on('unsubscribe', async (roomName, cb) => {
		try {
			socket.broadcast.to(roomName).emit('user-left', socket.id);

			const users = await io.in(roomName).fetchSockets();

			// delete room if it is empty and not a default room
			if (users.length === 1 && !defaultRooms.includes(roomName)) {
				// remove room
				delete messages[roomName];
			}

			// reset messages in default room if no one is in there
			if (users.length === 1 && defaultRooms.includes(roomName)) {
				messages[roomName] = [];
			}
		} catch (e) {
			console.log('[error]', 'leave room :', e);
		}
	});

	socket.on('disconnecting', () => {
		const self = this;

		if (self) {
			const rooms = Object.keys(self.rooms);

			rooms.forEach(function (room) {
				self.to(room).emit('user-left', self.id);
			});
		}
	});

	socket.on('disconnect', () => {
		// filter out user
		users = users.filter((u) => u.id !== socket.id);
	});
});

// Define Routes
app.use('/api/user', userRoutes);

// make uploads folder static
app.use('/uploads', express.static('uploads'));
app.use('/chat/uploads', express.static('uploads'));

// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(
		`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);
