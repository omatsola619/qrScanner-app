import React, { useState, useEffect } from 'react';
import { Dimensions, Modal, Text, View, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // For navigation

const QRScanner: React.FC = () => {
  const [hasCameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );
  const [hasAudioPermission, setAudioPermission] = useState<boolean | null>(
    null
  );
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const navigation = useNavigation(); // Access navigation

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const audioPermission = await Camera.requestMicrophonePermissionsAsync();

      setCameraPermission(cameraPermission.status === 'granted');
      setAudioPermission(audioPermission.status === 'granted');
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    if (hasCameraPermission !== null && hasAudioPermission !== null) {
      if (!hasCameraPermission || !hasAudioPermission) {
        console.log('You have to grant us access');
      }
    }
  }, [hasCameraPermission, hasAudioPermission]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScannedData(data);
    setIsModalVisible(true);
    await AsyncStorage.setItem('scannedQRCodeData', data); // Save data to AsyncStorage
  };

  const handleModalConfirm = async () => {
    if (scannedData) {
      // Check if the scanned data is a valid URL
      const isUrl = await Linking.canOpenURL(scannedData);
      const storedData = await AsyncStorage.getItem('scannedQRCodeList');
      const updatedData = storedData ? JSON.parse(storedData) : [];

      if (isUrl) {
        // If it's a URL, open the link
        Linking.openURL(scannedData);
      } else {
        // If it's not a URL, copy the text to clipboard and save to AsyncStorage
        await Clipboard.setStringAsync(scannedData);
      }

      // Update the history list with the new data (limit to last 10 items)
      updatedData.push(scannedData);
      if (updatedData.length > 10) {
        updatedData.shift(); // Remove the first (oldest) item if there are more than 10
      }
      await AsyncStorage.setItem(
        'scannedQRCodeList',
        JSON.stringify(updatedData)
      );
    }
    setIsModalVisible(false);
    navigation.goBack(); // Go back to the previous screen
  };

  if (hasCameraPermission && hasAudioPermission) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          style={{ height: Dimensions.get('window').height }}
        />

        {/* Modal to show QR data */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Scanned Data:</Text>
              <Text style={styles.scannedData}>{scannedData}</Text>
              <Text style={styles.okText} onPress={handleModalConfirm}>
                OK
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No camera or microphone permission granted.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
  },
  scannedData: {
    marginBottom: 20,
    fontSize: 16,
    color: 'gray',
  },
  okText: {
    color: '#007BFF',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
  },
});

export default QRScanner;
