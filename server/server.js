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

io.use(function (socket, next) {
	sessionMiddleware(socket.request, socket.request.res || {}, next);
});

app.use(sessionMiddleware);

let users = [];

const messages = {
	general: [],
	sports: [],
	movies: [],
	books: [],
	politics: [],
	videogames: [],
	music: [],
	technology: []
};

io.on('connection', (socket) => {
	// Connection now authenticated to receive further events
	// console.log('Session: ', socket.request.session);
	console.log(`User ${socket.id} has connected`);
	const { userName, image } = socket.handshake.query;

	const user = {
		id: socket.id,
		userName,
		image
	};

	users.push(user);

	// console.log(users);

	socket.on('join room', (roomName, cb) => {
		// join the room
		socket.join(roomName);

		// emit new user to all users in that chat room
		socket.to(roomName).emit('new user', user);

		// return messages of that room to user
		// minmize it to last x messages
		cb(messages[roomName]);
	});

	socket.on('send message', ({ content, to, sender, chatName }) => {
		// message to chat room
		const payload = {
			content,
			chatName,
			sender
		};

		// emit message to all users in chat room
		socket.to(to).emit('new message', payload);

		// For creating/joining a custom room
		// check if chat room exists
		if (messages[chatName]) {
			// push message to chatroom messages
			messages[chatName].push({ sender, content });
		}
	});

	socket.on('disconnect', () => {
		// filter out user
		users = users.filter((u) => u.id !== socket.id);

		// emit new users array
		io.emit('new user', users);
	});
});

// Define Routes
app.use('/api/user', userRoutes);

// make uploads folder static
app.use('/uploads', express.static('uploads'));

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
