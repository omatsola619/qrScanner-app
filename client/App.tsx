import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyStack from './navigation/Stack';
import AuthStack from './navigation/AuthStack';
import {
  AuthContext,
  AuthProvider,
  UserProfileType,
} from './context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

function Root() {
  const { user, login, loading } = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    const fetchToken = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userProfile: UserProfileType = JSON.parse(storedUser);
          login(userProfile); // Pass the parsed user object
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        SplashScreen.hideAsync();
      }
    };
    fetchToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FDB623" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MyStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
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
