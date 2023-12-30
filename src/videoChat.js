// src/VideoChat.js
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const VideoChat = ({ roomId }) => {
  const socket = useRef();
  const peers = useRef([]);

  useEffect(() => {
    socket.current = io('http://localhost:5000',{ transports: ['websocket']}); // replace with your server URL

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        const myVideo = document.createElement('video');
        myVideo.muted = true;
        addVideoStream(myVideo, stream);

        socket.current.emit('join-room', roomId);

        socket.current.on('user-connected', userId => {
          connectToNewUser(userId, stream);
        });
      });

    socket.current.on('user-disconnected', userId => {
      const peerToRemove = peers.current.find(peer => peer.userId === userId);
      if (peerToRemove) {
        peerToRemove.peer.destroy();
        peers.current = peers.current.filter(peer => peer.userId !== userId);
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [roomId]);

  const connectToNewUser = (userId, stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', signal => {
      socket.current.emit('new-user', { userId, signal });
    });

    peer.on('stream', userVideoStream => {
      const userVideo = document.createElement('video');
      addVideoStream(userVideo, userVideoStream);
    });

    socket.current.on('returning-signal', ({ userId, signal }) => {
      const existingPeer = peers.current.find(peer => peer.userId === userId);

      if (!existingPeer) {
        const newPeer = new Peer({ initiator: false, trickle: false, stream });
        newPeer.signal(signal);

        newPeer.on('stream', userVideoStream => {
          const userVideo = document.createElement('video');
          addVideoStream(userVideo, userVideoStream);
        });

        peers.current.push({ userId, peer: newPeer });
      }
    });
  };

  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    document.getElementById('video-grid').appendChild(video);
  };

  return (
    <div>
      <div id="video-grid"></div>
    </div>
  );
};

export default VideoChat;
