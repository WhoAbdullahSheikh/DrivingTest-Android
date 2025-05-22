import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useLanguage} from '../../context/LanguageContext';

const QuestionCountSelection = ({navigation, route}) => {
  const {language} = useLanguage();
  
  const translations = {
    en: {
      selectCount: 'Select number of questions',
      questions20: '20 Questions',
      questions40: '40 Questions',
      questions60: '60 Questions',
      questions100: '100 Questions',
      startTest: 'Start Test',
    },
    sv: {
      selectCount: 'Välj antal frågor',
      questions20: '20 Frågor',
      questions40: '40 Frågor',
      questions60: '60 Frågor',
      questions100: '100 Frågor',
      startTest: 'Starta testet',
    },
    ar: {
      selectCount: 'اختر عدد الأسئلة',
      questions20: '20 سؤال',
      questions40: '40 سؤال',
      questions60: '60 سؤال',
      questions100: '100 سؤال',
      startTest: 'بدء الاختبار',
    },
  };
  
  const t = translations[language] || translations.en;
  
  const handleStartTest = (questionCount) => {
    navigation.navigate('Test', {
      testType: 'full',
      title: t.startTest,
      questionCount: questionCount,
    });
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2d2d2d']}
        style={styles.background}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.title}>{t.selectCount}</Text>
            </View>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={styles.optionCard}
                onPress={() => handleStartTest(20)}>
                <Text style={styles.optionText}>{t.questions20}</Text>
                <Icon name="chevron-right" size={24} color="#4CAF50" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionCard}
                onPress={() => handleStartTest(40)}>
                <Text style={styles.optionText}>{t.questions40}</Text>
                <Icon name="chevron-right" size={24} color="#4CAF50" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionCard}
                onPress={() => handleStartTest(60)}>
                <Text style={styles.optionText}>{t.questions60}</Text>
                <Icon name="chevron-right" size={24} color="#4CAF50" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionCard}
                onPress={() => handleStartTest(100)}>
                <Text style={styles.optionText}>{t.questions100}</Text>
                <Icon name="chevron-right" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
  },
  optionsContainer: {
    padding: 20,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Raleway-Regular',
  },
});

export default QuestionCountSelection;