import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useLanguage} from '../context/LanguageContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import swedishTrafficRules from '../data/rules/swedishTrafficRules.en.json';

const translations = {
  en: {
    title: 'Swedish Traffic Rules',
  },
  sv: {
    title: 'Svenska trafikregler',
  },
  ar: {
    title: 'قواعد المرور السويدية',
  },
};

const RulesScreen = ({navigation}) => {
  const {getTextStyle, language} = useLanguage();
  const t = translations[language] || translations.en;

  const handleBack = () => {
    navigation.goBack();
  };
  const isRTL = language === 'ar';

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2d2d2d']}
        style={styles.gradientContainer}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity
            style={[styles.backButton, isRTL && styles.backButtonRTL]}
            onPress={handleBack}>
            <Icon name="arrow-left" size={30} color="#fff" />
          </TouchableOpacity>

          <Text
            style={[styles.title, getTextStyle(), isRTL && styles.titleRTL]}>
            <Text>{t.title}</Text>
          </Text>

          <ScrollView style={styles.scrollContainer}>
            {swedishTrafficRules.categories.map(category => (
              <View key={category.id} style={styles.categoryContainer}>
                <Text
                  style={[
                    styles.categoryTitle,
                    getTextStyle(),
                    isRTL && styles.textRTL,
                  ]}>
                  {category.title[language] || category.title.en}
                </Text>
                <View
                  style={[
                    styles.rulesContainer,
                    isRTL && styles.rulesContainerRTL,
                  ]}>
                  {category.rules.map(rule => (
                    <View
                      key={rule.id}
                      style={[styles.ruleItem, isRTL && styles.ruleItemRTL]}>
                      {!isRTL && <View style={styles.bulletPoint} />}
                      <Text
                        style={[
                          styles.ruleText,
                          getTextStyle(),
                          isRTL && styles.textRTL,
                        ]}>
                        {rule.text[language] || rule.text.en}
                      </Text>
                      {isRTL && <View style={styles.bulletPoint} />}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'Raleway-Bold',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    fontFamily: 'Raleway-Bold',
  },
  rulesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    fontFamily: 'Raleway-Regular',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginTop: 8,
    marginRight: 10, // Default margin for LTR
    marginLeft: 5, // Add left margin in RTL
  },
  bulletPointRTL: {
    marginRight: 0, // Remove right margin in RTL
    marginLeft: 10, // Add left margin in RTL
  },
  ruleText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    fontFamily: 'Raleway-Regular',
  },
});

export default RulesScreen;
