import ScannerScreen from '../screens/Scanner';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeViewStack from './HomeViewStack';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeView" component={HomeViewStack} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
