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

// {
//     // id: uuidV4(),
//     content: `Welcome to the General chat room!!`,
//     to: 'General',
//     sender: 'Chatter-Bot'
// }

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

	socket.on('join-room', async (roomName, cb) => {
		// join the room
		socket.join(roomName);

		// emit new user to all users in that chat room
		socket.to(roomName).emit('new-user', user);

		// get all sockets in that room
		const sockets = await io.in(roomName).fetchSockets();

		const usersInRoom = users.filter((u) =>
			sockets.some((s) => u.id === s.id)
		);

		// return messages of that room to user
		const m = [...messages[roomName]];

		cb(messages[roomName], usersInRoom);
	});

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

	socket.on('disconnecting', function () {
		const self = this;
		const rooms = Object.keys(self.rooms);

		console.log(rooms);

		rooms.forEach(function (room) {
			self.to(room).emit('user-leave', self.id);
		});
	});

	socket.on('disconnect', () => {
		// filter out user
		users = users.filter((u) => u.id !== socket.id);

		// socket.broadcast.to(roomName).emit('user-leave', socket.id);
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
