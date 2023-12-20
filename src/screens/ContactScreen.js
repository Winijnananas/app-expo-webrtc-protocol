import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from '@expo/vector-icons'

const ContactScreen = () => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraType() {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.buttonCreate}>
                <Text style={styles.text}>
                    Create Room
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonJoin}>
                <Text style={styles.text}>
                    Join Room
                </Text>
            </TouchableOpacity>
            </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButtonMic}>
              <Ionicons name="md-mic" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtonPhone}>
              <Ionicons name="md-call" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtonflip}>
              <Ionicons name="md-camera" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'red',
    marginBottom: 10,
  },
 btnContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
 },
  buttonCreate: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'purple',
    marginBottom: 10,
    marginRight:5
  },
  buttonJoin: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'grey',
    marginBottom: 10,
    marginRight:5
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  iconButtonMic: {
    backgroundColor: 'black',
    borderRadius: 25,
    padding: 10,
  },
  iconButtonPhone: {
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 10,
  },
  iconButtonflip: {
    backgroundColor: 'blue',
    borderRadius: 25,
    padding: 10,
  },
});

export default ContactScreen;
