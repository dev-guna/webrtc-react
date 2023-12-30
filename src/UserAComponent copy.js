// UserAComponent2.js

import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const UserAComponent2 = () => {
  const socket = useRef(null);
  let peerConnection;

  useEffect(() => {
    socket.current = io('http://localhost:5000',{ transports: ['websocket']}); // replace with your server URL

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      // Use obtained stream
      const videoElement = document.getElementById('localVideo');
      videoElement.srcObject = stream;
  
      // Create peer connection
      const configuration = { iceServers:[
        {
          url: 'turn:turn.anyfirewall.com:443?transport=tcp',
          credential: 'webrtc',
          username: 'webrtc'
      }
    ]};

      peerConnection = new RTCPeerConnection(configuration);
  
      // Add tracks to the peer connection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
  
      // Send stream to server (pseudo-code)
      // Example: using WebSocket to transmit data
      //const ws = io('http://localhost:5000',{ transports: ['websocket']});
      peerConnection.createOffer()
        .then(function (offer) {
          return peerConnection.setLocalDescription(offer);
        })
        .then(function () {
          socket.current.emit('offer', peerConnection.localDescription);
          //ws.send('offer', peerConnection.localDescription);
        })
        .catch(function (error) {
          console.error('Error sending stream:', error);
        });
    })
    .catch(function (error) {
      console.error('Error accessing media devices:', error);
    });
  
    return () => {
      // Clean up logic, close connections, etc. (if needed)
      peerConnection.close();
    };
  }, []);

  return (
    <div>
      <video id="localVideo" autoPlay muted playsInline></video>
      {/* Other UI elements */}
    </div>
  );
};

export default UserAComponent2;
