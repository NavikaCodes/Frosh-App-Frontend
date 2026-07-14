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
import ConnectScreen from './screens/ConnectScreen';
import AboutFroshScreen from './screens/AboutFroshScreen';
import ProfileScreen from './screens/ProfileScreen';
import ScheduleScreen from './screens/ScheduleScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'fade', // default for all screens
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />

          {/* These four screens slide from the right */}
          <Stack.Screen
            name="Team"
            component={TeamScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="Life"
            component={LifeScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="Hostels"
            component={HostelsScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="Societies"
            component={SocietiesScreen}
            options={{ animation: 'slide_from_right' }}
          />

          {/* All other screens use the default 'fade' */}
          <Stack.Screen name="Boys" component={BoysScreen} />
          <Stack.Screen name="Girls" component={GirlsScreen} />
          <Stack.Screen name="ConnectUs" component={ConnectScreen} />
          <Stack.Screen name="AboutFrosh" component={AboutFroshScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
