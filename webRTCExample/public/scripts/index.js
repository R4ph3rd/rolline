//state-"store"
let isAlreadyCalling = false;
let getCalled = false;

const existingCalls = [];


//actuall RTC work
const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

async function callUser(socketId) {
	const offer = await peerConnection.createOffer();
	await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

	console.log('call')
	
	socket.emit("call-user", {
		offer,
		to: socketId
	});
}

let chatContainer = document.querySelector('.video-chat-container');

peerConnection.ontrack = function({ streams: [stream] }) {
	createVideo(stream)

  const remoteVideo = document.getElementById("remote-video");
  if (remoteVideo) {
    remoteVideo.srcObject = stream;
  }
};


const createVideo = (stream) => {
	let video = document.createElement('video');
	video.style.wi
	dth = '200px';
	video.style.height = '150px',
	// video.style.position = 'absolute',
	video.style.bottom = '100px',
	video.style.marginLeft = '20px'
	video.style.marginTop = '20px'
	video.classList.add('broadcast')
	video.autoplay = true;

	video.srcObject = stream;
	chatContainer.appendChild(video)
}

//media accessing and manipulation
navigator.mediaDevices.getUserMedia({video:true, audio: true})
.then(function(stream) {
	/*const localVideo = document.getElementById("local-video");
	if (localVideo) {
		localVideo.srcObject = stream;
	} */

	createVideo(stream)

	stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
})
.catch(function(err) {
	console.error(err);
});

//socket stuff
var socket = io();

socket.on("update-user-list", ({ users }) => {
	updateUserList(users);
});
	
socket.on("remove-user", ({ socketId }) => {
	const elToRemove = document.getElementById(socketId);
	
	if (elToRemove) {
		elToRemove.remove();
	}
});


socket.on("broadcast-made", async data => {  
	await peerConnection.setRemoteDescription(
	  new RTCSessionDescription(data.offer)
	);
	const answer = await peerConnection.createAnswer();
	await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
  
	socket.emit("broadcast-answer", {
	  answer
	});
  });


socket.on("call-made", async data => {
  /* if (getCalled) {
    const confirmed = confirm(
      `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
    );

    if (!confirmed) {
      socket.emit("reject-call", {
        from: data.socket
      });

      return;
    }
  } */

  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit("make-answer", {
    answer,
    to: data.socket
  });
  getCalled = true;
});

socket.on("answer-made", async data => {
	await peerConnection.setRemoteDescription(
		new RTCSessionDescription(data.answer)
	);
	
	if (!isAlreadyCalling) {
		callUser(data.socket);
		isAlreadyCalling = true;
	}
});

socket.on("call-rejected", data => {
  alert(`User: "Socket: ${data.socket}" rejected your call.`);
  unselectUsersFromList();
});

//mostly UI
function updateUserList(socketIds) {
	const activeUserContainer = document.getElementById("active-user-container");
	
	socketIds.forEach(socketId => {
		const alreadyExistingUser = document.getElementById(socketId);
		if (!alreadyExistingUser) {
			const userContainerEl = createUserItemContainer(socketId);
			activeUserContainer.appendChild(userContainerEl);
		}
	});
}

function createUserItemContainer(socketId) {
	const userContainerEl = document.createElement("div");
	
	const usernameEl = document.createElement("p");
	
	userContainerEl.setAttribute("class", "active-user");
	userContainerEl.setAttribute("id", socketId);
	usernameEl.setAttribute("class", "username");
	usernameEl.innerHTML = `Socket: ${socketId}`;
	
	userContainerEl.appendChild(usernameEl);
	
	userContainerEl.addEventListener("click", () => {
		unselectUsersFromList();
		userContainerEl.setAttribute("class", "active-user active-user--selected");
		const talkingWithInfo = document.getElementById("talking-with-info");
		talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
		callUser(socketId);
	}); 
	return userContainerEl;
}

function unselectUsersFromList() {
  const alreadySelectedUser = document.querySelectorAll(
    ".active-user.active-user--selected"
  );

  alreadySelectedUser.forEach(el => {
    el.setAttribute("class", "active-user");
  });
}

let dogeller = document.querySelector('h1');
dogeller.addEventListener("click", () => {
	broadcast();
}); 

async function broadcast() {
	const offer = await peerConnection.createOffer();
	await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
	
	socket.emit("broadcast-stream", {
		offer
	});

	console.log('sent broadcast')
}


socket.on("broadcast-built", async data => {
	await peerConnection.setRemoteDescription(
		new RTCSessionDescription(data.answer)
	);

	// broadcast();
});