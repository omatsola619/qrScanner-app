import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
// import Dp from '../assets/dp.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

function Home() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigation = useNavigation<any>();
  const { user, logout, loading, login } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FDB623" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <TouchableOpacity onPress={logout} style={styles.dp}>
              {user?.photo ? (
                <Image
                  source={{ uri: user.photo }}
                  style={{ width: 40, height: 40, borderRadius: '100%' }}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#333',
                    borderRadius: 50,
                  }}
                />
              )}
            </TouchableOpacity>
            <View>
              <Text>Welcome!</Text>
              <Text>{user ? user.givenName : 'myname'}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Optional: Set background color
  },
});
