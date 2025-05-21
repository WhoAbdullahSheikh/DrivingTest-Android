import React from 'react';
import { StatusBar } from 'react-native';
import { I18nManager } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from 'styled-components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider } from './src/context/LanguageContext';

const theme = {
  colors: {
    primary: '#3F51B5',
    secondary: '#4CAF50',
    danger: '#FF5722',
    info: '#2196F3',
    background: '#f5f5f5',
    text: '#333',
    lightText: '#fff',
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};
I18nManager.allowRTL(true);

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <StatusBar barStyle="light-content" backgroundColor="#3F51B5" />
          <AppNavigator />
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;