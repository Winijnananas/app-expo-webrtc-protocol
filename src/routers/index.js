import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import { createStackNavigator } from '@react-navigation/stack';
import bottomTab from '../navigations/bottomTab';
import CustomAlert from '../components/CustomAlert';

const Stack =createStackNavigator();
const index = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="App" component={bottomTab}/>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Contact" component={ContactScreen}/>
    <Stack.Screen name="About" component={AboutScreen}/>
    <Stack.Screen name="Alert" component={CustomAlert}/>
</Stack.Navigator>
  )
}

export default index

const styles = StyleSheet.create({})