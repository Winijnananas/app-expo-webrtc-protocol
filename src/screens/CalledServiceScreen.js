import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RTCPeerConnection, mediaDevices } from 'react-native-webrtc';
import { getFirestore, collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

const CalledServiceScreen = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [roomId, setRoomId] = useState('');
  const peerConnection = useRef(null);

  useEffect(() => {
    initializeWebRTC();
  }, []);

  const initializeWebRTC = async () => {
    const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
    setLocalStream(stream);
  };

  const createPeerConnection = () => {
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    peerConnection.current = new RTCPeerConnection(configuration);

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });
    }

    peerConnection.current.onicecandidate = handleICECandidateEvent;
    peerConnection.current.ontrack = handleTrackEvent;
  };

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      const candidate = event.candidate.toJSON();
      getFirestore(app).collection('rooms').doc(roomId).collection('candidates').add(candidate);
    }
  };

  const handleTrackEvent = (event) => {
    if (event.streams && event.streams[0]) {
      setRemoteStream(event.streams[0]);
    }
  };

  const handleCreateRoom = async () => {
    createPeerConnection();
    try {
      const roomRef = await getFirestore(app).collection('rooms').add({ /* Additional Room Data */ });
      setRoomId(roomRef.id);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  // Other functions for joining room, hanging up, etc.

  return (
    <View style={styles.container}>
      <Button title="Create Room" onPress={handleCreateRoom} />
      {/* Other UI components for joining room, hanging up, and video views */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Other styles for video views, buttons, etc.
});

export default CalledServiceScreen;
