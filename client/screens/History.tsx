import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

function History() {
  const [history, setHistory] = useState<string[]>([]);

  // Fetch the history when the component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('scannedQRCodeList');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        // Slice the array to get the last 10 items
        setHistory(parsedHistory.slice(-10)); // Get the last 10 items
      }
    };

    fetchHistory();
  }, []);

  // This function will handle adding new items to the list (could be triggered by scanning)
  const updateHistory = async () => {
    const storedHistory = await AsyncStorage.getItem('scannedQRCodeList');
    const updatedHistory = storedHistory ? JSON.parse(storedHistory) : [];
    // Slice the array to ensure only the last 10 items are kept
    setHistory(updatedHistory.slice(-10)); // Get the last 10 items
  };

  // Optionally, you can also listen for changes to AsyncStorage if needed (e.g., from another screen)
  useEffect(() => {
    const interval = setInterval(() => {
      updateHistory(); // Keep history updated every few seconds
    }, 3000); // Update every 3 seconds, adjust as necessary

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  // Function to copy the text or URL to the clipboard
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    alert('Copied to clipboard: ' + text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History Screen</Text>

      {/* Render the history list */}
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => copyToClipboard(item)}>
            <View style={styles.historyItem}>
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No scanned QR codes yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default History;
