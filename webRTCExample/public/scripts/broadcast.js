//state-"store"
let isAlreadyCalling = false;
let getCalled = false;

const existingCalls = [];


//actuall RTC work
const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

let chatContainer = document.querySelector('.video-chat-container');

peerConnection.ontrack = function({ streams: [stream] }) {
	createVideo(stream)
};

//media accessing and manipulation
navigator.mediaDevices.getUserMedia({video:true, audio: true})
.then(function(stream) {
    // createVideo(stream)
    const bigVideo = document.getElementById("remote-video");
	if (bigVideo) {
        bigVideo.srcObject = stream;
        bigVideo.addEventListener('click', () => {console.log(peerConnection) })
	}
	// console.log('stream !', stream)

	stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
})
.catch(function(err) {
	console.error(err);
});

//socket stuff
var socket = io();

socket.on("update-user-list", ({ users }) => {
	// updateUserList(users);
	// broadcast();
});
    

async function broadcast() {
	const offer = await peerConnection.createOffer();
	await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
	
	socket.emit("broadcast-stream", {
		offer
	});

	console.log('sent broadcast', offer)
}



socket.on("broadcast-made", async data => {  
	await peerConnection.setRemoteDescription(
	  new RTCSessionDescription(data.offer)
    );
    
    // console.log('made', peerConnection)
	const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
    
    if(peerConnection.iceConnectionState != 'connected'){
        console.log('new attempt')
        broadcast();
    }
  
	socket.emit("broadcast-answer", {
	  answer
	});
  });


socket.on("broadcast-built", async data => {
	await peerConnection.setRemoteDescription(
		new RTCSessionDescription(data.answer)
    );
    
    // console.log('answer', data, peerConnection)

	// broadcast();
});


let dogeller = document.querySelector('h1');
dogeller.addEventListener("click", () => { broadcast()}); 


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


window.onload =  () => {
	console.log('window load')
	broadcast();
}