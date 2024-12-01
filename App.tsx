import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStack from './navigation/Stack';
import AuthStack from './navigation/AuthStack';

const Tabs = createBottomTabNavigator();

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
      {isLoggedIn ? <MyStack /> : <AuthStack />}
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
