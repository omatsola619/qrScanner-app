// @ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    // Check if sign-in was successful
    if (response) {
      const userInfo = response.data.user; // Extract user information
      // console.log({ user: userInfo });

      // Save user info to AsyncStorage
      await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));

      //send user info to backend
      // console.log('Sending to backend:', { user: userInfo });
      // try {
      //   // console.log('Sending to backend:', { user: userInfo });
      //   const response = await axios.post('http://localhost:5001/auth/login', {
      //     email: userInfo.email,
      //     googleId: userInfo.id,
      //     name: userInfo.name,
      //     avatar: userInfo.photo
      //   });
      //   console.log('DATA SUCCESSFULLY SENT TO BACKEND', response.data.user)
      // } catch (error) {
      //   console.error('Error logging in user:', error.response?.data || error.message);
      // }

      console.log('User info saved to AsyncStorage');
      // return true;
    } else {
      // Sign in was cancelled by the user
      console.log('Sign in was cancelled');
    }
  } catch (error) {
    if (error) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (e.g., sign in) already in progress
          console.log('Sign-in already in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          console.log('Google Play services not available');
          break;
        default:
          // some other error happened
          console.log('An error occurred:', error.message);
      }
    } else {
      // An error that's not related to Google Sign-In occurred
      console.log('An unknown error occurred');
    }
  }
};
