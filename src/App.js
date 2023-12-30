import React from 'react';
import VideoChat from './videoChat';

const App = () => {
  const roomId = 'your-room-id';
  // const [socket, setSocket] = useState(null);
  // const remoteVideoRef = useRef(null);

  // useEffect(() => {
  //   const socketConnection = io('http://localhost:5000'); // Replace with your server URL

  //   socketConnection.on('connect', () => {
  //     setSocket(socketConnection);
  //   });

  //   socketConnection.on('offer', (offer) => {
  //     handleOffer(offer);
  //   });

  //   socketConnection.on('answer', (answer) => {
  //     handleAnswer(answer);
  //   });

  //   socketConnection.on('ice-candidate', (candidate) => {
  //     handleNewICECandidate(candidate);
  //   });

  //   return () => {
  //     if (socketConnection) {
  //       socketConnection.disconnect();
  //     }
  //   };
  // }, []);

  // const handleOffer = async (offer) => {
  //   const peerConnection = new RTCPeerConnection();

  //   peerConnection.ontrack = (event) => {
  //     if (remoteVideoRef.current) {
  //       remoteVideoRef.current.srcObject = event.streams[0];
  //     }
  //   };

  //   // Add received tracks to the peer connection
  //   // Assume that offer.sdp contains the offer received from the user
  //   await peerConnection.setRemoteDescription(offer);
  //   const answer = await peerConnection.createAnswer();
  //   await peerConnection.setLocalDescription(answer);

  //   // Send the answer to the user
  //   socket.emit('answer', { answer: peerConnection.localDescription });
  // };

  // const handleAnswer = async (answer) => {
  //   // Handle answer received from the user
  //   // Assume that answer.sdp contains the answer received from the user
  //   await peerConnection.setRemoteDescription(answer);
  // };

  // const handleNewICECandidate = (candidate) => {
  //   // Handle new ICE candidate received from the user
  //   // Assume that candidate contains the ICE candidate received from the user
  //   peerConnection.addIceCandidate(candidate);
  // };

  return (
    <div>
      {/* <h1>Admin Dashboard</h1>
      <video ref={remoteVideoRef} autoPlay playsInline></video> */}
      <h1>WebRTC Multi Peer Connection</h1>
      <VideoChat roomId={roomId} />
    </div>
  );
};

export default App;
