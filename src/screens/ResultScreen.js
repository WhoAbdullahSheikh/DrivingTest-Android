import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Animated,
  Easing,
  I18nManager
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLanguage} from '../context/LanguageContext';

const {width, height} = Dimensions.get('window');

const ResultsScreen = ({navigation, route}) => {
  const {getTextStyle, language} = useLanguage();
  const isRTL = language === 'ar';
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const fadeValue = React.useRef(new Animated.Value(0)).current;
  
  // Animation on mount
  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    ]).start();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, [fadeValue, scaleValue]);

  const {answers = [], questions = []} = route.params || {};
  
  const questionMap = {};
  questions.forEach(q => {
    questionMap[q.id] = q;
  });

  const correctAnswers = answers.filter(answer => {
    const question = questionMap[answer.questionId];
    return question && answer.selectedOption === question.correctAnswerIndex;
  }).length;

  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= 70;

  // Result translations
  const resultTexts = {
    title: {
      en: 'Test Results',
      sv: 'Testresultat',
      ar: 'نتيجة الاختبار'
    },
    score: {
      en: 'Your Score',
      sv: 'Din poäng',
      ar: 'درجتك'
    },
    correct: {
      en: 'Correct Answers',
      sv: 'Rätta svar',
      ar: 'إجابات صحيحة'
    },
    total: {
      en: 'Total Questions',
      sv: 'Totalt frågor',
      ar: 'إجمالي الأسئلة'
    },
    passed: {
      en: 'You Passed!',
      sv: 'Du klarade det!',
      ar: 'لقد نجحت!'
    },
    failed: {
      en: 'You Failed',
      sv: 'Du klarade inte',
      ar: 'لم تنجح'
    },
    restart: {
      en: 'Restart Test',
      sv: 'Börja om testet',
      ar: 'إعادة الاختبار'
    },
    home: {
      en: 'Home',
      sv: 'Hem',
      ar: 'الصفحة الرئيسية'
    },
    details: {
      en: 'View Details',
      sv: 'Visa detaljer',
      ar: 'عرض التفاصيل'
    },
    congrats: {
      en: 'Congratulations!',
      sv: 'Grattis!',
      ar: 'تهانينا!'
    },
    tryAgain: {
      en: 'Try Again!',
      sv: 'Försök igen!',
      ar: 'حاول مرة أخرى!'
    }
  };

  const getText = (key) => resultTexts[key][language] || resultTexts[key].en;

  const handleRestart = () => {
    navigation.replace('Test', {title: route.params?.title});
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleViewDetails = () => {
    navigation.navigate('TestDetails', {
      answers: answers,
      questions: questions,
    });
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#2d2d2d']}
        style={styles.gradientContainer}>
        <SafeAreaView style={styles.safeArea}>
          <Animated.View 
            style={[
              styles.container,
              {
                opacity: fadeValue,
                transform: [{ scale: scaleValue }]
              }
            ]}
          >
            <Text style={[styles.title, getTextStyle()]}>{getText('title')}</Text>
            
            <View style={styles.resultContainer}>
              <Animated.View 
                style={[
                  styles.scoreCircle,
                  { 
                    borderColor: passed ? '#4CAF50' : '#F44336',
                    shadowColor: passed ? '#4CAF50' : '#F44336',
                  }
                ]}
              >
                <Text style={styles.percentageText}>{percentage}%</Text>
                <Text style={[styles.passFailText, getTextStyle()]}>
                  {passed ? getText('passed') : getText('failed')}
                </Text>
                {passed && (
                  <Icon 
                    name="check-circle" 
                    size={40} 
                    color="#4CAF50" 
                    style={styles.resultIcon} 
                  />
                )}
                {!passed && (
                  <Icon 
                    name="alert-circle" 
                    size={40} 
                    color="#F44336" 
                    style={styles.resultIcon} 
                  />
                )}
              </Animated.View>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, getTextStyle()]}>
                    {getText('score')}
                  </Text>
                  <Text style={[styles.detailValue, {color: passed ? '#4CAF50' : '#F44336'}]}>
                    {percentage}%
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, getTextStyle()]}>
                    {getText('correct')}
                  </Text>
                  <Text style={styles.detailValue}>
                    {correctAnswers}/{totalQuestions}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={handleViewDetails}>
                <Text style={styles.detailsButtonText}>{getText('details')}</Text>
                <Icon 
                  name={isRTL ? "chevron-left" : "chevron-right"} 
                  size={20} 
                  color="#2196F3" 
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.messageContainer, passed ? styles.successMessage : styles.errorMessage]}>
              <Icon 
                name={passed ? "party-popper" : "emoticon-sad"} 
                size={24} 
                color="#fff" 
              />
              <Text style={[styles.messageText, getTextStyle()]}>
                {passed ? getText('congrats') : getText('tryAgain')}
              </Text>
            </View>

            <View style={[styles.buttonContainer, isRTL && styles.rtlButtonContainer]}>
              <TouchableOpacity
                style={[styles.button, styles.restartButton]}
                onPress={handleRestart}>
                <Icon name="reload" size={20} color="#fff" />
                <Text style={styles.buttonText}>{getText('restart')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.homeButton]}
                onPress={handleGoHome}>
                <Icon name="home" size={20} color="#fff" />
                <Text style={styles.buttonText}>{getText('home')}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  resultContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scoreCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  passFailText: {
    fontSize: 20,
    marginTop: 5,
    color: '#fff',
    fontWeight: '600',
  },
  resultIcon: {
    position: 'absolute',
    bottom: 10,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  detailsButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    width: '100%',
    justifyContent: 'center',
  },
  successMessage: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: 'rgba(76, 175, 80, 0.5)',
    borderWidth: 1,
  },
  errorMessage: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    borderColor: 'rgba(244, 67, 54, 0.5)',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rtlButtonContainer: {
    flexDirection: 'row-reverse',
  },
  button: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 25,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
  },
  homeButton: {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ResultsScreen;