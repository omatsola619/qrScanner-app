import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Dp from '../assets/dp.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.dp}>
              <Dp width={40} height={40} />
            </View>
            <View>
              <Text>Welcome</Text>
              <Text>Omash</Text>
            </View>
          </View>
          <View style={styles.scanWrp}>
            <TouchableOpacity
              style={styles.scanBtn}
              onPress={() => navigation.navigate('Scanner')}
            >
              <Text style={styles.scanTxt}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  dp: {
    borderRadius: 50,
  },
  scanBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    width: '60%',
    height: 200,
    borderRadius: 10,
  },
  scanWrp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanTxt: {
    fontSize: 24,
    color: 'white',
    fontWeight: 700,
  },
});
