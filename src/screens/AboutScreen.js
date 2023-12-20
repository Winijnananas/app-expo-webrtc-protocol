import React from 'react';
import { View, Text, StyleSheet, Image,ImageBackground } from 'react-native';

const AboutScreen = () => {
  return (
    <ImageBackground source={require('../../assets/bg.png')} style={styles.background}>
    <View style={styles.container}>
      <Image
         source={{
            uri: 'https://www.centralpattana.co.th/storage/our-properties/shopping-center/central-plaza/nakornsithammarat/gallery/004.jpg'
          }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.heading}>Central Plaza Nakhon Si Thammarat</Text>
        <Text style={styles.info}>
          Central Plaza Nakhon Si Thammarat is a prominent shopping mall located
          in the heart of Nakhon Si Thammarat province, offering a diverse range
          of shops, entertainment, and dining experiences.
        </Text>
        <Text style={styles.address}>
          Address: ซอย 5 ถนนราชดำเนิน เทศบาลนครนครศรีธรรมราช 80000
        </Text>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  infoContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'white'
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color:'white'
  },
  address: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});

export default AboutScreen;
