import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

// Import all question files
import questionsEN from '../data/questions/questions.en.json';
import questionsSV from '../data/questions/questions.sv.json';
import questionsAR from '../data/questions/questions.ar.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  const questionSets = {
    en: questionsEN,
    sv: questionsSV,
    ar: questionsAR
  };

  // Load saved language from storage
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('@language');
        if (savedLanguage) {
          setLanguage(savedLanguage);
          handleRTL(savedLanguage);
        }
      } catch (e) {
        console.error('Failed to load language', e);
      }
    };
    loadLanguage();
  }, [handleRTL]);

  const handleRTL = useCallback((lang) => {
    const shouldBeRTL = lang === 'ar';
    if (shouldBeRTL !== isRTL) {
      I18nManager.forceRTL(shouldBeRTL);
      I18nManager.allowRTL(shouldBeRTL);
      setIsRTL(shouldBeRTL);
    }
  }, [isRTL]);

  const updateLanguage = async (newLanguage) => {
    try {
      await AsyncStorage.setItem('@language', newLanguage);
      setLanguage(newLanguage);
      handleRTL(newLanguage);
    } catch (e) {
      console.error('Failed to save language', e);
    }
  };

  const getQuestions = () => {
    return questionSets[language] || questionSets.en;
  };

  const getTextStyle = () => {
    return {
      textAlign: language === 'ar' ? 'right' : 'left',
      writingDirection: language === 'ar' ? 'rtl' : 'ltr'
    };
  };

  const getContainerStyle = () => {
    return {
      flexDirection: language === 'ar' ? 'row-reverse' : 'row'
    };
  };

  const getAlignmentStyle = () => {
    return {
      alignItems: language === 'ar' ? 'flex-end' : 'flex-start'
    };
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: updateLanguage,
      isRTL,
      getQuestions,
      getTextStyle,
      getContainerStyle,
      getAlignmentStyle
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};