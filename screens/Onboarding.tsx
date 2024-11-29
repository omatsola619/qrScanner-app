import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Qr from '../assets/qr.svg';
import Google from '../assets/google.svg';

function Onboarding() {
  return (
    <View style={styles.container}>
      <View style={{ height: '30%' }} />
      <View style={styles.wrapper}>
        <View style={styles.qrContainer}>
          <Qr />
        </View>

        <View>
          <Text style={styles.txtInfo}>
            Use this app to scan any qr code using your phone. Login to
            continue.
          </Text>

          <TouchableOpacity activeOpacity={0.7} style={styles.button}>
            <Text style={styles.txt2}>Continue with</Text>
            <Google width={23} height={23} />
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
