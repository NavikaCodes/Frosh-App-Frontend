import React, { useEffect, useCallback } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Baloo2_800ExtraBold } from '@expo-google-fonts/baloo-2';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

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

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent', 
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Baloo2_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right', 
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" 
          component={HomeScreen}
          options={{
    animationEnabled: false,         
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,           
    cardOverlayEnabled: false,          
    presentation: 'transparentModal',   
  }}
           />
          <Stack.Screen name="Team" 
          component={TeamScreen}
          options={{
    animationEnabled: false,           
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,          
    cardOverlayEnabled: false,          
    presentation: 'transparentModal',   
  }} 
          />
          <Stack.Screen name="Life" component={LifeScreen}
          options={{
    animationEnabled: false,          
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,           
    cardOverlayEnabled: false,         
    presentation: 'transparentModal',   
  }}
          />
          <Stack.Screen name="Hostels" component={HostelsScreen} 
          options={{
    animationEnabled: false,           
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,           
    cardOverlayEnabled: false,          
    presentation: 'transparentModal',   
  }}
          />
          <Stack.Screen name="Societies" component={SocietiesScreen} 
          options={{
    animationEnabled: false,           
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,           
    cardOverlayEnabled: false,         
    presentation: 'transparentModal',   
  }}
          />
          <Stack.Screen name="Boys" component={BoysScreen} 
          options={{
    animationEnabled: false,           
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,           
    cardOverlayEnabled: false,         
    presentation: 'transparentModal',   
  }}
          />
          <Stack.Screen name="Girls" component={GirlsScreen} 
          options={{
    animationEnabled: false,           
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,          
    cardOverlayEnabled: false,         
    presentation: 'transparentModal',   
  }}
          />

          {/* These screens slide up from the bottom – smooth both ways */}
          <Stack.Screen
            name="ConnectUs"
            component={ConnectScreen}
            options={{
    animationEnabled: false,         
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,           
    cardOverlayEnabled: false,          
    presentation: 'transparentModal',   
  }}
          />
          <Stack.Screen
            name="AboutFrosh"
            component={AboutFroshScreen}
            options={{
    animationEnabled: false,          
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,           
    cardOverlayEnabled: false,          
    presentation: 'transparentModal',   
  }}
          />
          <Stack.Screen
            name="Schedule"
            component={ScheduleScreen}
            options={{
    animationEnabled: false,           
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,          
    cardOverlayEnabled: false,         
    presentation: 'transparentModal',   
  }}
          />
          <Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    animationEnabled: false,          
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },  
    cardShadowEnabled: false,           
    cardOverlayEnabled: false,          
    presentation: 'transparentModal',   
  }}
/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}