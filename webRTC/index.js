const express = require("express");
const app = express();
const http = require("http").createServer(app)
const io = require('socket.io')(http);
const {join} = require("path");

let rooms = {
	general: []
};

const defaultRoom = 'general';

app.use(express.static(join(__dirname,'public')));

const port = 3000;
http.listen(port, () => {
	console.log("app started on " + port);
});

io.on("connection", socket => {
	const existingSocket = rooms.general.find(
		existingSocket => existingSocket === socket.id
	);

	if (!existingSocket) {

		if (rooms.general){
			rooms.general.push(socket.id);
		} else {
			rooms.general = [socket.id];
		}
	
		socket.join(defaultRoom);
	
		socket.emit('entered-in-room', {
			room: defaultRoom,
			personalId: socket.id,
			message: 'Hello @everyone !',
			users: rooms.general.filter(id => id != socket.id),
		})
	
		setTimeout( () => {
			socket.in(defaultRoom).emit('new-user-entered', {
				room: defaultRoom,
				message: 'Hi ' + socket.id,
				user: socket.id
			})
		}, 500)
	}

	

	socket.on('disconnect',() => {
		console.log("bye bye 👋");
		for (let room in rooms){
			rooms[room].splice(
				rooms[room].findIndex(id => id == socket.id),
				1
			)

			socket.in(room).emit('user-leave', {
				message: 'bye bye',
				socketId: socket.id,
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

	// webrtc messages

	socket.on("call-user", data => {
		socket.to(data.to).emit("call-made", {
			offer: data.offer,
			socket: socket.id
		});
	});

	socket.on("make-answer", data => {
		socket.to(data.to).emit("answer-made", {
			socket: socket.id,
			answer: data.answer
		});
	});

	socket.on("reject-call", data => {
		socket.to(data.from).emit("call-rejected", {
			socket: socket.id
		});
	});

	console.log("connection estblished by: "+socket.id);
	console.log(rooms);
})