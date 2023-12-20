import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";
import AboutScreen from "../screens/AboutScreen";
import CalledServiceScreen from "../screens/CalledServiceScreen";


//importScreen pages



const Tab = createBottomTabNavigator();



const bottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarActiveTintColor: 'red', tabBarInactiveTintColor: '#FFF', tabBarStyle: { backgroundColor: '#1B1B1B', borderBottomColor: 'black' } }}>
            <Tab.Screen
                
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => (
                        //<MaterialCommunityIcons name="home" color={color} size={size} />
                        <MaterialCommunityIcons name="home-variant" color={color} size={size} />
                    ),
                }}
            />
      
            
            <Tab.Screen
                name='ContactStaff'
                component={ContactScreen}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => (
                        //<MaterialCommunityIcons name="bookmark-multiple" color={color} size={size} />
                        <MaterialCommunityIcons name="phone" color={color} size={size} />
                    ),
                }}
            />
          
            <Tab.Screen
                name='About'
                component={AboutScreen}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => (
                        // <Icon solid name="id-card" color={color} size={size} />
                        //<MaterialCommunityIcons name="account" color={color} size={size} />
                        <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
                        
                    ),
                }}
            />

            <Tab.Screen
                name='Called'
                component={CalledServiceScreen}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, size }) => (
                        // <Icon solid name="id-card" color={color} size={size} />
                        //<MaterialCommunityIcons name="account" color={color} size={size} />
                        <MaterialCommunityIcons name="question" color={color} size={size} />
                        
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default bottomTab;