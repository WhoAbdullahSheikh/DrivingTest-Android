import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLanguage} from '../context/LanguageContext';

const SettingsScreen = ({navigation}) => {
  const {language} = useLanguage();

  const t = {
    en: {
      title: 'Settings',
      language: 'Language',
      appearance: 'Appearance',
      notifications: 'Notifications',
      help: 'Help',
    },
    sv: {
      title: 'Inställningar',
      language: 'Språk',
      appearance: 'Utseende',
      notifications: 'Aviseringar',
      help: 'Hjälp',
    },
    ar: {
      title: 'الإعدادات',
      language: 'اللغة',
      appearance: 'المظهر',
      notifications: 'الإشعارات',
      help: 'مساعدة',
    },
  }[language];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{t.title}</Text>
      </View>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('LanguageSettings')}>
        <Icon name="translate" size={24} color="#4CAF50" />
        <Text style={styles.optionText}>{t.language}</Text>
        <Icon name="chevron-right" size={24} color="#aaa" />
      </TouchableOpacity>
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
    marginTop: 60,
    alignItems: 'center',
    padding: 20,
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
    fontFamily: 'Raleway-Regular',
  },
});

export default SettingsScreen;
