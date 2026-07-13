import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './components/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import TeamScreen from './screens/TeamScreen';
import LifeScreen from './screens/LifeScreen';
import HostelsScreen from './screens/HostelScreen';
import BoysScreen from './screens/BoysScreen';
import GirlsScreen from './screens/GirlsScreen';
import SocietiesScreen from './screens/SocietiesScreen';
import HelpSupportScreen from './screens/HelpSupportScreen'; // 👈 import

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Team" component={TeamScreen} />
          <Stack.Screen name="Life" component={LifeScreen} />
          <Stack.Screen name="Hostels" component={HostelsScreen} />
          <Stack.Screen name="Boys" component={BoysScreen} />
          <Stack.Screen name="Girls" component={GirlsScreen} />
          <Stack.Screen name="Societies" component={SocietiesScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
