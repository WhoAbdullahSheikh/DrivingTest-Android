// screens/LanguageSettings.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSettings = ({ navigation }) => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇬🇧'
    },
    { 
      code: 'sv', 
      name: 'Swedish', 
      nativeName: 'Svenska',
      flag: '🇸🇪' 
    },
    { 
      code: 'ar', 
      name: 'Arabic', 
      nativeName: 'العربية',
      flag: '🇸🇦',
      rtl: true 
    }
  ];

  const translations = {
    en: {
      title: 'Language',
      current: 'Current language',
      select: 'Select your preferred language'
    },
    sv: {
      title: 'Språk',
      current: 'Nuvarande språk',
      select: 'Välj ditt föredragna språk'
    },
    ar: {
      title: 'اللغة',
      current: 'اللغة الحالية',
      select: 'اختر لغتك المفضلة'
    }
  }[language] || translations.en;

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{translations.title}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>{translations.current}:</Text>
        <View style={styles.currentLanguageContainer}>
          <Text style={styles.currentLanguageText}>
            {languages.find(l => l.code === language)?.nativeName || language}
          </Text>
        </View>

        <Text style={styles.subtitle}>{translations.select}:</Text>
        
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageOption,
              language === lang.code && styles.selectedLanguage
            ]}
            onPress={() => handleLanguageChange(lang.code)}>
            <Text style={styles.languageFlag}>{lang.flag}</Text>
            <View style={styles.languageTextContainer}>
              <Text style={styles.languageName}>{lang.name}</Text>
              <Text style={styles.languageNativeName}>{lang.nativeName}</Text>
            </View>
            {language === lang.code && (
              <Icon name="check" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    fontFamily: 'Raleway-Bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 15,
    fontFamily: 'Raleway-Regular',
  },
  currentLanguageContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
  },
  currentLanguageText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  selectedLanguage: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 15,
    
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Raleway-Regular',
  },
  languageNativeName: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 2,
    fontFamily: 'Raleway-Regular',
  },
});

export default LanguageSettings;