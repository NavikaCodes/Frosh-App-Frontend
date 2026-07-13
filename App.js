import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Easing } from 'react-native'; // 👈 for easing

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

const Stack = createNativeStackNavigator();

// Custom transition config (matches the theme-switch animation)
const transitionConfig = {
  animation: 'timing',
  config: {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'fade', // fallback, but we also use cardStyleInterpolator
            // Custom scale + fade transition
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
                transform: [
                  {
                    scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.96, 1],
                    }),
                  },
                ],
              },
            }),
            transitionSpec: {
              open: transitionConfig,
              close: transitionConfig,
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Team" component={TeamScreen} />
          <Stack.Screen name="Life" component={LifeScreen} />
          <Stack.Screen name="Hostels" component={HostelsScreen} />
          <Stack.Screen name="Boys" component={BoysScreen} />
          <Stack.Screen name="Girls" component={GirlsScreen} />
          <Stack.Screen name="Societies" component={SocietiesScreen} />
          <Stack.Screen name="ConnectUs" component={ConnectScreen} />
          <Stack.Screen name="AboutFrosh" component={AboutFroshScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
