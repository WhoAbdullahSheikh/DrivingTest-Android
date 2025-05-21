import React, {useState} from 'react';
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

// Import all category JSON files
import speedLimits from '../data/rules/speedLimits.json';
import rightOfWay from '../data/rules/rightOfWay.json';
import alcoholAndDrugs from '../data/rules/alcoholAndDrugs.json';
import winterDriving from '../data/rules/winterDriving.json';
import mobilePhones from '../data/rules/mobilePhones.json';
import childSafety from '../data/rules/childSafety.json';
import lightsAndVisibility from '../data/rules/lightsAndVisibility.json';
import parking from '../data/rules/parking.json';
import overtaking from '../data/rules/overtaking.json';
import documentsAndEquipment from '../data/rules/documentsAndEquipment.json';

// Combine all categories into one array
const allCategories = [
  speedLimits,
  rightOfWay,
  alcoholAndDrugs,
  winterDriving,
  mobilePhones,
  childSafety,
  lightsAndVisibility,
  parking,
  overtaking,
  documentsAndEquipment
];

const translations = {
  en: {
    title: 'Swedish Traffic Rules',
    selectCategory: 'Select a category',
  },
  sv: {
    title: 'Svenska trafikregler',
    selectCategory: 'Välj en kategori',
  },
  ar: {
    title: 'قواعد المرور السويدية',
    selectCategory: 'اختر فئة',
  },
};

const RulesScreen = ({navigation}) => {
  const {getTextStyle, language} = useLanguage();
  const t = translations[language] || translations.en;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isRTL = language === 'ar';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2d2d2d']}
        style={styles.gradientContainer}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity
            style={[styles.backButton, isRTL && styles.backButtonRTL]}
            onPress={selectedCategory ? handleBackToCategories : handleBack}>
            <Icon 
              name="arrow-left" 
              size={24} 
              color="#fff" 
            />
          </TouchableOpacity>

          <Text style={[styles.title, getTextStyle(), isRTL && styles.titleRTL]}>
            {t.title}
          </Text>

          {!selectedCategory ? (
            // Show category selection
            <View style={styles.categoriesContainer}>
              <Text style={[styles.subtitle, getTextStyle(), isRTL && styles.textRTL]}>
                {t.selectCategory}
              </Text>
              <ScrollView contentContainerStyle={styles.categoriesGrid}>
                {allCategories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.categoryCard}
                    onPress={() => handleCategorySelect(category.id)}>
                    <Text style={[styles.categoryCardText, getTextStyle()]}>
                      {category.title[language] || category.title.en}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : (
            // Show rules for selected category with numbering
            <ScrollView style={styles.scrollContainer}>
              {allCategories
                .filter(category => category.id === selectedCategory)
                .map(category => (
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
                      {category.rules.map((rule, index) => (
                        <View
                          key={rule.id}
                          style={[styles.ruleItem, isRTL && styles.ruleItemRTL]}>
                          {!isRTL && (
                            <Text style={styles.ruleNumber}>
                              {index + 1}.
                            </Text>
                          )}
                          <Text
                            style={[
                              styles.ruleText,
                              getTextStyle(),
                              isRTL && styles.textRTL,
                            ]}>
                            {rule.text[language] || rule.text.en}
                          </Text>
                          {isRTL && (
                            <Text style={styles.ruleNumber}>
                              {index + 1}.
                            </Text>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
            </ScrollView>
          )}
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
    top: 10,
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  backButtonRTL: {
    left: 0,
    right: undefined,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'Raleway-Bold',
  },
  titleRTL: {
    textAlign: 'right',
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.7)',
  },
  categoryCardText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
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
  rulesContainerRTL: {
    flexDirection: 'column',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ruleItemRTL: {
    flexDirection: 'row-reverse',
  },
  ruleNumber: {
    color: '#fff',
    marginRight: 10,
    marginLeft: 5,
    fontFamily: 'Raleway-Regular',
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    lineHeight: 24,
    fontFamily: 'Raleway-Regular',
  },
  textRTL: {
    textAlign: 'right',
  },
});

export default RulesScreen;