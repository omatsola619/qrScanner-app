import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Onboarding from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import History from './screens/History';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScannerScreen from './screens/Scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const TabSection = () => {
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
        name="Index"
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

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabSection} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // To handle loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('@userInfo');
        if (userInfo) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        console.error('Error checking user info:', error);
      } finally {
        setIsLoading(false); // Loading complete
      }
    };

    checkUserInfo();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FDB623" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MyStack /> : <Onboarding />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Optional: Set background color
  },
});
