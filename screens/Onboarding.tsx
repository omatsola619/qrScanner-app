import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Qr from '../assets/qr.svg';
// import Google from '../assets/google.svg';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '../const';
import { signIn } from '../const/Signin';
import AntDesign from '@expo/vector-icons/AntDesign';

function Onboarding() {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true,
    forceCodeForRefreshToken: false,
    iosClientId: IOS_CLIENT_ID,
  });

  return (
    <View style={styles.container}>
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
            onPress={signIn}
          >
            <Text style={styles.txt2}>Continue with</Text>
            {/*<Google width={23} height={23} />*/}
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
