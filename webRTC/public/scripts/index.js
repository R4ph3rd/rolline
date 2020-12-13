//state-"store"
let isAlreadyCalling = false;
let getCalled = false;

let localStream = null;

const peers = {
	//<remoteSocketId>:<RTCPeerConnection>
}

let rtc = {
	general: {
		messages: {},
		users: {}
	}, // [name] : [RTCPeerConnections]
	personalId: null
}

const chatText = document.getElementById('chat-text');
const videoContainer = document.querySelector('.videos-room-container');
const localVideo = document.getElementById("local-video");

async function getPeerConnection(socketId){
	if(peers[socketId]){
		return peers[socketId];
	}

	peers[socketId] = new RTCPeerConnection()

	peers[socketId].ontrack = function(rtcTrackEvent) {
		console.dir(peers);
		if(rtcTrackEvent.track.kind == "video"){
			addVideoContainer(socketId,rtcTrackEvent.streams[0]);
		}
	};

	const stream = await getLocalMediaStream();
	stream.getTracks().forEach(track => peers[socketId].addTrack(track, stream));
	
	return peers[socketId];
}

async function getLocalMediaStream(){
	if(localStream){
		return localStream;
	}

	const stream = await navigator.mediaDevices.getUserMedia({video:true, audio: true});
	localStream = stream;
	return stream;
}

//actuall RTC work
const { RTCPeerConnection, RTCSessionDescription } = window;

//media accessing and manipulation
getLocalMediaStream().then(function(stream) {
	const localVideo = document.getElementById("local-video");
	if (localVideo) {
		localVideo.srcObject = stream;
	}

	// stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
	
})
.catch(function(err) {
	console.error(err);
});

async function callUser(socketId) {
	const peerConnection = await getPeerConnection(socketId)
	const offer = await peerConnection.createOffer();
	await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
	
	socket.emit("call-user", {
		offer,
		to: socketId
	});
}

//socket stuff
var socket = io();

socket.on('entered-in-room', data => {
	rtc.personalId = data.personalId;
	sendMessage(data.message)

	for (let socketId of data.users){
		callUser(socketId);
	}
})

socket.on('new-user-entered', data => {
	sendMessage(data.message)

})
	
socket.on("user-leave", ({ room, message, socketId }) => {
	rtc[room].messages[socketId] = message ;
	delete rtc[room].users[socketId];

	
	const video = document.getElementById(socketId)
	console.log('user-lave', socketId, video)
	if(video){
		video.remove();
	}
});


socket.on("call-made", async data => {
  const peerConnection = await getPeerConnection(data.socket)
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit("make-answer", {
    answer,
    to: data.socket
  });
});


socket.on("answer-made", async data => {
	const peerConnection = await getPeerConnection(data.socket)
	await peerConnection.setRemoteDescription(
		new RTCSessionDescription(data.answer)
	);
		
	callUser(data.socket);
});

socket.on("call-rejected", data => {
  alert(`User: "Socket: ${data.socket}" rejected your call.`);
  unselectUsersFromList();
});



socket.on('share-message', data => {
	addMessage(data.socket, data.message, data.room);
})


// socket emitters only
const sendMessage = (msg) => {
	if (!msg){
		var message = document.getElementById('input-message').value;
	} else {
		var message = msg;
	}
	socket.emit('send-message', {
		message: message,
		room: 'general'
	})
}


//// interactions

const addMessage = (socketId, message, room) => {
	if(room){
		rtc[room].messages[socketId] = message;
	} else {
		rtc.general.messages[socketId] = message;
	}

	let msg = document.createElement('li');
	msg.classList.add('message');
	
	if( socketId == rtc.personalId){
		msg.classList.add('you');
		var sender = 'You';
	} else {
		var sender = socketId;
	}

	msg.innerHTML = `
		<h4>${sender}</h4>
		<p>${message}</h4>
	`
	chatText.appendChild(msg)
}


const addVideoContainer = (peerSocketId, srcObj) => {
	let user = document.createElement('div');
	user.classList.add('user');
	user.id = peerSocketId;
	// user.srcObject = srcObj;
	user.innerHTML = `
		<video autoplay></video>
		<p>${peerSocketId}</p>
	`;

	user.children[0].srcObject = srcObj;

	videoContainer.appendChild(user);
}
