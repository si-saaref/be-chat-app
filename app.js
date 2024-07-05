const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const roomRouter = require('./app/room/router');
const messageRouter = require('./app/message/router');

const URL = `/api/v1`;

const db = require('./db/index');

db.once('open', () => {
	console.log('Connect with mongodb');
});

const app = express();
const server = createServer(app);

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${URL}/room`, roomRouter);
app.use(`${URL}/message`, messageRouter);

const port = 3029;
app.set('port', port);

server.listen(port);

const io = new Server(server, {
	allowEIO3: true,
	cors: {
		origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
		methods: ['GET', 'POST'],
		credentials: true,
	},
	connectionStateRecovery: {},
});

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('joinRoom', ({ roomId }) => {
		socket.join(roomId);
		console.log('A user joined room: ' + roomId);
	});

	socket.on('leaveRoom', ({ roomId }) => {
		socket.leave(roomId);
		console.log('A user left room: ' + roomId);
	});

	socket.on('addMessage', ({ roomId }) => {
		io.to(roomId).emit('newMessage');
	});
});

module.exports = app;
