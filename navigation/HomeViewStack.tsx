import { Platform } from 'react-native';
import Home from '../screens/Home';
import AntDesign from '@expo/vector-icons/AntDesign';
import History from '../screens/History';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

const HomeViewStack = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: 'black',
        tabBarItemStyle: {
          paddingBottom: Platform.OS === 'android' ? 8 : 0,
        },
        tabBarStyle: {
          padding: 20,
          height: Platform.OS === 'android' ? 70 : 90,
        },
      }}
    >
      <Tabs.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="qrcode"
              size={24}
              color={focused ? 'black' : 'grey'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="history"
              size={24}
              color={focused ? 'black' : 'grey'}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default HomeViewStack;
