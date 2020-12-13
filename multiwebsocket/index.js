const express = require("express");
const app = express();
const http = require("http").createServer(app)
const io = require('socket.io')(http);
const {join} = require("path");

let activeSockets = [];

let rooms = {
	general: []
};

app.use(express.static(join(__dirname,'public')));

const port = 3002;
http.listen(port, () => {
	console.log("app started on " + port);
});

io.on("connection", socket => {
	/* const existingSocket = activeSockets.find(
		existingSocket => existingSocket === socket.id
	);

	if (!existingSocket) {
		activeSockets.push(socket.id);

		rooms.general.push(socket.id)

		socket.emit("update-user-list", { // to sender
			users: rooms.general.filter(socketId => socketId != socket.id),
			roomConnected: Object.keys(rooms)[0],
			personalId: socket.id
		});

		socket.broadcast.emit("update-user-list", { // everyone except sener
			users: [socket.id]
		});
	}
 */
	

	socket.on('enter-room', data => {		
		if (rooms[data.room]){
			rooms[data.room].push(socket.id);
		} else {
			rooms[data.room] = [socket.id];
		}

		socket.join(data.room);

		socket.emit('entered-in-room', {
			room: data.room,
			personalId: socket.id,
			message: 'Hello @everyone !',
			users: rooms[data.room].filter(id => id != socket.id),
		})

		socket.in(data.room).emit('new-user-entered', {
			room: data.room,
			message: 'Hi ' + socket.id,
			user: socket.id
		})
	})

	socket.on('close-connection', () => {
		for (let room in rooms){
			rooms[room].splice(
				rooms[room].findIndex(id => id == socket.id),
				1
			)

			socket.in(room).emit('user-leave', {
				message: 'bye bye',
				socket: socket.id,
				room: room
			})
		}
	})

	socket.on('send-message', data => {
		if (data.room){
			io.in(data.room).emit('share-message', {
				message: data.message,
				socket: socket.id,
				room: data.room
			})
		}
	})


	// rtc

	socket.on('call-user', data => {
		console.log('call-user from', socket.id, ' to ', data.to)
		socket.to(data.to).emit("call-made", {
			offer: data.offer,
			room: data.room,
			socket: socket.id,
		});
	})

	socket.on("make-answer", data => {
		socket.to(data.to).emit("answer-made", {
			socket: socket.id,
			answer: data.answer,
			room: data.room,
		});
	});

	console.log("connection estblished by: "+socket.id);
	console.log(activeSockets, rooms);
})