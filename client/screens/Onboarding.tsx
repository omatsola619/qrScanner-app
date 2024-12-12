// @ts-nocheck
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '../const';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Onboarding() {
  const { login } = useContext(AuthContext);

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true,
    forceCodeForRefreshToken: false,
    iosClientId: IOS_CLIENT_ID,
  });

  const navigation = useNavigation();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      // Check if sign-in was successful
      if (response) {
        const userInfo = response.data.user; // Extract user information
        console.log({ user: userInfo });

        // Log the user in
        login(userInfo);

        //send user info to backend

        const datatoSend = {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.photo
        }

          const resp = await axios.post('http://localhost:5001/auth/login', {
            user: datatoSend
          });
          console.log('DATA SUCCESSFULLY SENT TO BACKEND', resp)

        console.log('User logged in successfully');
      } else {
        // Sign in was cancelled by the user
        Alert.alert(
          'Sign-In Cancelled',
          'You cancelled the Google sign-in process.'
        );
      }
    } catch (error) {
      if (error) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert(
              'Sign-In In Progress',
              'Sign-in is already in progress.'
            );
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert(
              'Play Services Unavailable',
              'Google Play services are not available or outdated on your device.'
            );
            break;
          default:
            Alert.alert(
              'Sign-In Error',
              error.message || 'An unknown error occurred.'
            );
        }
      } else {
        Alert.alert('Unknown Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDB623" />
      <View style={{ height: '30%' }} />
      <View style={styles.wrapper}>
        <View style={styles.qrContainer}>
          <AntDesign name="qrcode" size={250} color="#333" />
        </View>

        <View>
          <Text style={styles.txtInfo}>
            Use this app to scan any qr code using your phone. Login to
            continue.
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={async () => {
              signIn();
            }}
          >
            <Text style={styles.txt2}>Continue with</Text>
            <AntDesign name="google" size={23} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDB623',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  txtInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  qrContainer: {
    height: '60%',
  },
  button: {
    backgroundColor: '#333',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  txt2: {
    fontSize: 18,
    color: 'white',
  },
});
