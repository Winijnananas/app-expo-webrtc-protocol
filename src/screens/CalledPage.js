// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   PermissionsAndroid,
// } from 'react-native';
// import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

// const CalledPage = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [roomId, setRoomId] = useState('');
//   const [peerConnection, setPeerConnection] = useState(null);

//   const localStreamRef = useRef();
//   const remoteStreamRef = useRef();

//   useEffect(() => {
//     // Request permission to use camera and microphone
//     const getPermissions = async () => {
//       try {
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         ]);
//         if (
//           granted['android.permission.CAMERA'] === 'granted' &&
//           granted['android.permission.RECORD_AUDIO'] === 'granted'
//         ) {
//           startLocalStream();
//         } else {
//           console.log('Permissions denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };
//     getPermissions();
//   }, []);

//   const startLocalStream = async () => {
//     const stream = await mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     setLocalStream(stream);
//     localStreamRef.current.srcObject = stream;
//   };

//   const createOffer = async () => {
//     const pc = new RTCPeerConnection(configuration);
//     setPeerConnection(pc);

//     localStream.getTracks().forEach(track => {
//       pc.addTrack(track, localStream);
//     });

//     pc.onicecandidate = event => {
//       // Handle ICE candidate events by sending them to the other peer
//       if (event.candidate) {
//         // Send candidate to the remote peer using signaling mechanism
//       }
//     };

//     pc.ontrack = event => {
//       setRemoteStream(event.streams[0]);
//       remoteStreamRef.current.srcObject = event.streams[0];
//     };

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     // Send the offer to the remote peer using signaling mechanism
//   };

//   const joinRoom = async () => {
//     // Fetch room details or enter room ID
//     // Retrieve remote offer from the other peer using signaling mechanism

//     // Create peer connection and set remote description
//     const pc = new RTCPeerConnection(configuration);
//     setPeerConnection(pc);

//     localStream.getTracks().forEach(track => {
//       pc.addTrack(track, localStream);
//     });

//     pc.onicecandidate = event => {
//       // Handle ICE candidate events by sending them to the other peer
//       if (event.candidate) {
//         // Send candidate to the remote peer using signaling mechanism
//       }
//     };

//     pc.ontrack = event => {
//       setRemoteStream(event.streams[0]);
//       remoteStreamRef.current.srcObject = event.streams[0];
//     };

//     // Set remote offer
//     const remoteOffer = {}; // Get remote offer from signaling mechanism
//     await pc.setRemoteDescription(new RTCSessionDescription(remoteOffer));

//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     // Send the answer to the remote peer using signaling mechanism
//   };

//   return (
//     <View style={styles.container}>
//       <RTCView
//         ref={localStreamRef}
//         streamURL={localStream?.toURL()}
//         style={styles.localVideo}
//       />
//       <RTCView
//         ref={remoteStreamRef}
//         streamURL={remoteStream?.toURL()}
//         style={styles.remoteVideo}
//       />
//       <Text style={styles.roomIdText}>Room ID: {roomId}</Text>
//       <Button title="Create Room" onPress={createOffer} />
//       <Button title="Join Room" onPress={joinRoom} />
//     </View>
//   );
// };

// const configuration = {
//   iceServers: [
//     {
//       urls: [
//         'stun:stun1.l.google.com:19302',
//         'stun:stun2.l.google.com:19302',
//       ],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   localVideo: {
//     width: 200,
//     height: 150,
//     backgroundColor: 'black',
//     marginBottom: 10,
//   },
//   remoteVideo: {
//     width: 300,
//     height: 200,
//     backgroundColor: 'black',
//     marginBottom: 10,
//   },
//   roomIdText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });

// export default CalledPage;

import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';

const CalledPage = ({ route, navigation }) => {
  const { userId, username } = route.params;
  const [callingUser, setCallingUser] = useState(null);

  useEffect(() => {
    const callRef = firebase.database().ref('calls/' + userId);
    callRef.on('value', (snapshot) => {
      const caller = snapshot.val();
      setCallingUser(caller);
    });

    return () => {
      callRef.off('value');
    };
  }, [userId]);

  const answerCall = () => {
    // ตอบรับการโทร
    // เชื่อมต่อผู้ใช้งานที่เรียก
    // navigation.navigate('VideoCall', { userId, username });
  };

  return (
    <View>
      {callingUser ? (
        <View>
          <Text>{callingUser} is calling...</Text>
          <Button title="Answer" onPress={answerCall} />
        </View>
      ) : (
        <Text>Waiting for a call...</Text>
      )}
    </View>
  );
};

export default CalledPage;
