import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import BottomTab from '../navigations/bottomTab';
import CustomAlert from '../components/CustomAlert';
import CalledServiceScreen from '../screens/CalledServiceScreen';
import CalledPage from '../screens/CalledPage';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={BottomTab} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Alert" component={CustomAlert} />
      <Stack.Screen name="New" component={CalledPage} />
    </Stack.Navigator>
  );
};

export default Index;
