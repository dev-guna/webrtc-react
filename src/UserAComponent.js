// UserAComponent.js

import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const UserAComponent = () => {
  const socket = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection());

  useEffect(() => {
    socket.current = io('http://webrtc-backend-tbmd.onrender.com',{ transports: ['websocket']}); // replace with your server URL

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const localVideo = document.getElementById('localVideo');
        if (localVideo) {
          localVideo.srcObject = stream;
        }

        stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.createOffer()
          .then((offer) => {
            return peerConnection.current.setLocalDescription(offer);
          })
          .then(() => {
            socket.current.emit('offer', { offer: peerConnection.current.localDescription });
          })
          .catch((error) => {
            console.error('Error creating offer:', error);
          });
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit('ice-candidate', { candidate: event.candidate });
      }
    };

    return () => {
      // Clean up logic, close connections, etc. (if needed)
      peerConnection.current.close();
    };
  }, []);

  return (
    <div>
      <video id="localVideo" autoPlay muted playsInline></video>
      {/* Other UI elements */}
    </div>
  );
};

export default UserAComponent;
