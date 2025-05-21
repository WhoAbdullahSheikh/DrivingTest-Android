// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';
import LanguageScreen from '../screens/LanguageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LanguageSettings from '../screens/libs/LanguageSettings';
import ResultScreen from '../screens/ResultScreen';
import RulesScreen from '../screens/RulesScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Language">
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            headerShown: false,
            gestureEnabled: false  // Disables swipe back gesture
          }}
        />
        <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LanguageSettings"
          component={LanguageSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Results"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rules"
          component={RulesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;