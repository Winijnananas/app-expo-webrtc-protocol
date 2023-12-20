import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, message, onClose }) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertMessage}>{message}</Text>
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomAlert;
